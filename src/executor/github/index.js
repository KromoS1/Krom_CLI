const inquirer = require('inquirer');
const { Octokit } = require('@octokit/rest');
const GIT = require('simple-git');
const Configstore = require('configstore');

const { consoleExec } = require('../../utils/spawn');
const {
	initRepoQuestion,
	tokenQuestion,
	questions,
	createPRQuestion
} = require('./lib');
const customLogs = require('../../utils/customLogs');
const packageJson = require('../../../package.json');
const config = new Configstore(packageJson.name);
const { PATH_SCRIPTS } = require('../../variable');
const { Loader } = require('../../utils/loader');

class GitHub {
	static async #getDataLocalGit(octokit, simpleGit) {
		let owner = '';
		let repo = '';

		const loader = new Loader();
		loader.start();

		try {
			const data = await octokit.rest.users.getAuthenticated();

			if (data.status == 200) {
				owner = data.data.login;
			}
			loader.stop();
		} catch (e) {
			loader.stop();
			customLogs.error(e.message);
		}

		try {
			await simpleGit.revparse(['--show-toplevel'], (err, result) => {
				if (err) {
					console.error(err);
					return;
				}
				repo = result.trim().split('/').pop();
			});
			loader.stop();
		} catch (e) {
			loader.stop();
			customLogs.error(e.message);
		}

		return { owner, repo };
	}

	static async #checkingPullRequest(octokit, { owner, repo }) {
		let isPull = false;

		const loader = new Loader();

		loader.start();
		try {
			const res = await octokit.rest.pulls.list({
				owner,
				repo
			});

			res.data.forEach(pull => {
				if (pull.head.label == `${owner}:${currentBranch}`) {
					isPull = pull;
				}
			});

			loader.stop();
		} catch (e) {
			loader.stop();
			customLogs.error(e.message);
		}

		return isPull;
	}

	static async #createPullRequest(octokit, simpleGit, currentBranch) {
		const answer = await inquirer.prompt(createPRQuestion);

		let isAnswer = false;

		switch (answer.create_pr) {
			case 'Yes':
			case 'yes':
			case 'y':
				isAnswer = true;
		}

		if (!isAnswer) return;

		const loader = new Loader();

		const { owner, repo } = await GitHub.#getDataLocalGit(
			octokit,
			simpleGit
		);

		const isPullRequest = await GitHub.#checkingPullRequest(octokit, {
			owner,
			repo
		});

		if (isPullRequest) {
			customLogs.warning('A pull request exists for this branch.');
			return;
		}

		try {
			loader.start();

			const res = await octokit.rest.pulls.create({
				owner,
				repo,
				title: currentBranch,
				head: currentBranch,
				base: 'main'
			});
			loader.stop();
			customLogs.success(`Pull request created successfully:`);
			customLogs.warning(`\n<---  ${res.data.html_url}  --->`);
		} catch (e) {
			loader.stop();
			customLogs.error(`Error creating pull request: \n${e.message}`);
		}
	}

	static async push(flags, message) {
		const octokit = await GitHub.#authenticate();

		const simpleGit = GIT();
		const loader = new Loader();
		loader.start();

		const currentBranch = await simpleGit
			.branch()
			.then(branch => branch.current);
		const message_commit = flags.message ? message : currentBranch;

		try {
			await simpleGit
				.add('./*')
				.commit(message_commit)
				.push('origin', currentBranch, ['--set-upstream']);

			loader.stop();

			customLogs.success('Command push complete\n\n');
		} catch (e) {
			loader.stop();
			customLogs.log(e.message);
		}

		if (currentBranch !== 'main') {
			await GitHub.#createPullRequest(octokit, simpleGit, currentBranch);
		}
	}

	static async #authenticate() {
		customLogs.log('Authenticating...', 'gray');

		let token = config.get('github_token');

		if (token) {
			customLogs.log('Token is found in config. Skipping prompt.');

			try {
				const octokit = new Octokit({
					auth: token
				});

				return octokit;
			} catch (error) {
				throw new Error('Token is not valid');
			}
		} else {
			const answer = await inquirer.prompt(tokenQuestion);

			try {
				const octokit = new Octokit({
					auth: answer.token
				});

				config.set('github_token', answer.token);

				return octokit;
			} catch (error) {
				throw new Error('Token is not valid');
			}
		}
	}

	static async #createRepo(octokit, app_name) {
		if (app_name) {
			questions.shift();
		}

		const answers = await inquirer.prompt(questions);

		const data = {
			name: app_name || answers.name,
			description: answers.description,
			private: answers.visibility === 'private'
		};

		try {
			const response = await octokit.repos.createForAuthenticatedUser(
				data
			);

			customLogs.log('Created remote repository', 'gray');
			return response.data.ssh_url;
		} catch (error) {
			throw new Error('A repository with the same name already exists.');
		}
	}

	static async #bindNewRepo(url, app_name) {
		let simpleGit = GIT();

		if (app_name) {
			simpleGit = GIT({ baseDir: `${process.cwd()}/${app_name}` });
		}

		try {
			await simpleGit
				.init()
				.add('./*')
				.commit('Initial commit')
				.branch(['-M', 'main'])
				.addRemote('origin', url)
				.push('origin', 'main', ['--set-upstream']);

			customLogs.log(
				'Local repository is initialized and linked to remote repository',
				'gray'
			);

			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async #isInitRepo(isFirstQuestion) {
		if (isFirstQuestion) {
			const answer = await inquirer.prompt(initRepoQuestion);

			switch (answer.proceed) {
				case 'Yes':
				case 'yes':
				case 'y':
					return true;
			}

			customLogs.log('Okay, bye.', 'gray');
			return false;
		} else {
			return true;
		}
	}

	static async #addGitIgnore() {
		const path = process.env.APP_DIR + PATH_SCRIPTS;

		await consoleExec(`bash ${path}/add_gitignore.sh`, false);
	}

	static async initRepo(isFirstQuestion = true, app_name = '') {
		const isInit = await GitHub.#isInitRepo(isFirstQuestion);

		if (isInit) {
			const octokit = await GitHub.#authenticate();
			const url_repo = await GitHub.#createRepo(octokit, app_name);
			const isCreateRepo = await GitHub.#bindNewRepo(url_repo, app_name);

			if (isCreateRepo) {
				customLogs.success('Command complete');
			}
		}
	}
}

module.exports = GitHub;

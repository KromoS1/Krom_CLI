const inquirer = require('inquirer');
const { Octokit } = require('@octokit/rest');
const GIT = require('simple-git');
const Configstore = require('configstore');

const { consoleExec } = require('../../utils/spawn');
const { initRepoQuestion, tokenQuestion, questions } = require('./lib');
const customLogs = require('../../utils/customLogs');
const packageJson = require('../../../package.json');
const config = new Configstore(packageJson.name);
const { PATH_SCRIPTS } = require('../../variable');
const { Loader } = require('../../utils/loader');

class GitHub {
	static async push(flags, message) {
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
			customLogs.success('Command push complete');
		} catch (e) {
			customLogs.log(e.message);
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

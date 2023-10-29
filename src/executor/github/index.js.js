const inquirer = require('inquirer');
const { Octokit } = require('@octokit/rest');
const git = require('simple-git')();
const Configstore = require('configstore');

const { consoleSpawn, consoleExec } = require('../../utils/spawn');
const {
	initRepoQuestion,
	tokenQuestion,
	questions,
	dataGitIgnore
} = require('./lib');
const customLogs = require('../../utils/customLogs');
const packageJson = require('../../../package.json');
const config = new Configstore(packageJson.name);
const { APP_DIR, PATH_SCRIPTS } = require('../../variable');

class GitHub {
	static async push(flags, message) {
		let branch_name = await consoleSpawn('git symbolic-ref --short HEAD');

		branch_name = branch_name.trim();

		const message_commit = flags.message ? message : branch_name;

		const git_add = 'git add .';
		const local_commit = `git commit -am "${message_commit}"`;
		const local_push = `git push -u origin ${branch_name}`;

		await consoleExec(`${git_add}; ${local_commit}; ${local_push}`);
	}

	static async #authenticate() {
		customLogs.warning('Authenticating...	');

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

	static async #createRep(octokit) {
		const answers = await inquirer.prompt(questions);

		const data = {
			name: answers.name,
			description: answers.description,
			private: answers.visibility === 'private'
		};

		try {
			const response = await octokit.repos.createForAuthenticatedUser(
				data
			);

			return response.data.ssh_url;
		} catch (error) {
			throw new Error('A repository with the same name already exists.');
		}
	}

	static async #bindNewRepo(url) {
		try {
			await git
				.init()
				.add('./*')
				.commit('Initial commit')
				.branch(['-M', 'main'])
				.addRemote('origin', url)
				.push(url, 'main', ['--set-upstream']);

			return true;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	static async #isInitRepo(isFirstQuestion) {
		if (isFirstQuestion) {
			const answer = await inquirer.prompt(initRepoQuestion);

			if (answer.proceed !== 'Yes') {
				customLogs.log('Okay, bye.', 'gray');
				return false;
			}
		}

		return true;
	}

	static async #addGitIgnore() {
		const path = APP_DIR + PATH_SCRIPTS;

		await consoleExec(`bash ${path}/add_gitignore.sh`);
	}

	static async initRepo(isFirstQuestion = true) {
		const isInit = await GitHub.#isInitRepo(isFirstQuestion);

		if (isInit) {
			const octokit = await GitHub.#authenticate();
			const url_repo = await GitHub.#createRep(octokit);
			await GitHub.#addGitIgnore();
			const isCreateRepo = await GitHub.#bindNewRepo(url_repo);

			if (isCreateRepo) {
				customLogs.success('Repository created successfully!');
				customLogs.success(url_repo, 'bgBlueBright');
			}
		}
	}
}

module.exports = GitHub;

const inquirer = require('inquirer');
const { Octokit } = require('@octokit/rest');
const git = require('simple-git')();
const Configstore = require('configstore');

const { consoleExec } = require('../../utils/spawn');
const { initRepoQuestion, tokenQuestion, questions } = require('./lib');
const customLogs = require('../../utils/customLogs');
const packageJson = require('../../../package.json');
const config = new Configstore(packageJson.name);
const { APP_DIR, PATH_SCRIPTS } = require('../../variable');
const { Loader } = require('../../utils/loader');

class GitHub {
	static async push(flags, message) {
		const loader = new Loader();
		loader.start();

		const currentBranch = await git.branch().then(branch => branch.current);
		const message_commit = flags.message ? message : currentBranch;

		try {
			await git
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

			customLogs.log('Created remote repository', 'gray');
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
		}
	}

	static async #addGitIgnore() {
		const path = APP_DIR + PATH_SCRIPTS;

		await consoleExec(`bash ${path}/add_gitignore.sh`, false);
	}

	static async initRepo(isFirstQuestion = true) {
		const isInit = await GitHub.#isInitRepo(isFirstQuestion);

		if (isInit) {
			const octokit = await GitHub.#authenticate();
			const url_repo = await GitHub.#createRep(octokit);
			await GitHub.#addGitIgnore();
			const isCreateRepo = await GitHub.#bindNewRepo(url_repo);

			if (isCreateRepo) {
				customLogs.success('Command complete');
			}
		}
	}
}

module.exports = GitHub;

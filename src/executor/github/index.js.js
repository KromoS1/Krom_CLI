const inquirer = require('inquirer');
const { Octokit } = require('@octokit/rest');
const git = require('simple-git')();
const Configstore = require('configstore');

const { consoleExec } = require('../../utils/spawn');
const {
	initRepoQuestion,
	tokenQuestion,
	questions,
	createPullQuestion
} = require('./lib');
const customLogs = require('../../utils/customLogs');
const packageJson = require('../../../package.json');
const config = new Configstore(packageJson.name);
const { APP_DIR, PATH_SCRIPTS } = require('../../variable');
const { Loader } = require('../../utils/loader');

class GitHub {
	static async #createPullRequest(octokit, simpleGit, currentBranch) {
		let owner = '';
		let repo = '';

		const data = await octokit.rest.users.getAuthenticated();
		if (data.status == 200) {
			owner = data.data.login;
		}

		await simpleGit.revparse(['--show-toplevel'], (err, result) => {
			if (err) {
				console.error(err);
				return;
			}
			repo = result.trim().split('/').pop();
		});

		octokit.rest.pulls
			.list({
				owner,
				repo
			})
			.then(response => {
				response.data.forEach(pull => {
					console.log(pull.url);
					console.log(currentBranch);
					if (pull.head.label == `${owner}:${currentBranch}`) {
						console.log('пул есть');
					}
				});
				// console.log(response.data);
			});

		// octokit.rest.pulls
		// 	.create({
		// 		owner,
		// 		repo,
		// 		title: 'test pull request',
		// 		head: currentBranch,
		// 		base: 'main'
		// 	})
		// 	.then(response => {
		// 		const pullRequestNumber = response.data.number;
		// 		console.log(
		// 			`Пул-реквест успешно создан: ${remoteUrl}/pull/${pullRequestNumber}`
		// 		);
		// 	})
		// 	.catch(error => {
		// 		console.error(
		// 			'Ошибка при создании пул-реквеста:',
		// 			error.message
		// 		);
		// 	});
	}

	static async push(flags, message) {
<<<<<<< Updated upstream:src/executor/github/index.js.js
=======
		const octokit = await GitHub.#authenticate();

		const simpleGit = GIT();
>>>>>>> Stashed changes:src/executor/github/index.js
		const loader = new Loader();
		loader.start();

		const currentBranch = await git.branch().then(branch => branch.current);
		const message_commit = flags.message ? message : currentBranch;

<<<<<<< Updated upstream:src/executor/github/index.js.js
		try {
			await git
				.add('./*')
				.commit(message_commit)
				.push('origin', currentBranch, ['--set-upstream']);
=======
		// try {
		// 	await simpleGit
		// 		.add('./*')
		// 		.commit(message_commit)
		// 		.push('origin', currentBranch, ['--set-upstream']);
>>>>>>> Stashed changes:src/executor/github/index.js

		loader.stop();

		customLogs.success('Command push complete');

		await GitHub.#createPullRequest(octokit, simpleGit, currentBranch);
		// } catch (e) {
		// 	customLogs.log(e.message);
		// }
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

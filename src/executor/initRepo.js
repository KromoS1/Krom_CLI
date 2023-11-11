const chalk = require('chalk');
const inquirer = require('inquirer');

const question = [
	{
		name: 'proceed',
		type: 'input',
		message: 'Proceed to push this project to a Github remote repo?',
		choices: ['Yes', 'No'],
		default: 'Yes'
	}
];

class InitRepo {
	static async execute() {
		const answer = await inquirer.prompt(question);

		if (answer.proceed == 'Yes') {
			//proceed with Github authentication, creating the repo, etc.
			console.log(chalk.gray('Authenticating...'));
		} else {
			//show exit message
			console.log(chalk.gray('Okay, bye.'));
		}
	}
}

module.exports = InitRepo;

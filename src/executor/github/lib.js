const path = require('path');

const initRepoQuestion = [
	{
		name: 'proceed',
		type: 'input',
		message: 'Proceed to push this project to a Github remote repo?',
		choices: ['Yes', 'No'],
		default: 'Yes'
	}
];

const tokenQuestion = [
	{
		name: 'token',
		type: 'input',
		message: 'Enter your Github personal access token.',
		validate: function (value) {
			if (value.length == 40) {
				return true;
			} else return 'Please enter a valid token.';
		}
	}
];

const questions = [
	{
		name: 'name',
		type: 'input',
		message: 'Enter new repo name.',
		default: path.basename(process.cwd()), //set default to basename
		validate: function (value) {
			if (value.length) {
				return true;
			} else {
				return 'Please enter a valid input.';
			}
		}
	},
	{
		name: 'description',
		type: 'input',
		message: 'Enter new repo description (optional).',
		default: null
	},
	{
		name: 'visibility',
		type: 'input',
		message: 'Set repo to public or private?',
		choices: ['public', 'private'],
		default: 'private'
	}
];

const createPullQuestion = [
	{
		name: 'create_pull',
		type: 'input',
		message: 'Want to create a pull request?',
		choices: ['Yes', 'No'],
		default: 'Yes'
	}
];

module.exports = {
	initRepoQuestion,
	tokenQuestion,
	questions,
	createPullQuestion
};

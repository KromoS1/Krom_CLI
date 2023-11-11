const { consoleSpawnScript, consoleExec } = require('../utils/spawn');
const { PATH_SCRIPTS } = require('../variable');
const inquirer = require('inquirer');
const GitHub = require('./github');

const questionsAppName = [
	{
		name: 'app_name',
		type: 'input',
		message: 'Enter the name of the application:'
	}
];

const questionsFSD = [
	{
		name: 'create_fsd',
		type: 'input',
		message:
			'Do you want to add the architecture pattern "Feature Sliced Design"?',
		choices: ['Yes', 'No'],
		default: 'Yes'
	}
];

const questionsGit = [
	{
		name: 'create_repo',
		type: 'input',
		message: 'Do you want to initialize the repository, local and remote?',
		choices: ['Yes', 'No'],
		default: 'Yes'
	}
];

const checkAnswer = answer => {
	switch (answer) {
		case 'Yes':
		case 'yes':
		case 'y':
			return true;
		default:
			return false;
	}
};

class Template {
	static #getPath(technology, fileName) {
		return `${process.env.APP_DIR}${PATH_SCRIPTS}/template/${technology}/${fileName}.sh`;
	}

	static async execute(technology) {
		const path_template = Template.#getPath(technology, technology);

		const { app_name } = await inquirer.prompt(questionsAppName);

		consoleSpawnScript(
			`${process.env.COMMAND} ${path_template} ${app_name}`
		).then(async () => {
			const answer = await inquirer.prompt(questionsFSD);

			if (checkAnswer(answer.create_fsd)) {
				const path_fsd = Template.#getPath(technology, 'fsd');
				consoleSpawnScript(
					`${process.env.COMMAND} ${path_fsd} ${app_name}`
				).then(async () => {
					const answer = await inquirer.prompt(questionsGit);

					if (checkAnswer(answer.create_repo)) {
						GitHub.initRepo(false, app_name);
					}
				});
			} else {
				const answer = await inquirer.prompt(questionsGit);

				if (checkAnswer(answer.create_repo)) {
					GitHub.initRepo(false, app_name);
				}
			}
		});
	}
}

module.exports = Template;

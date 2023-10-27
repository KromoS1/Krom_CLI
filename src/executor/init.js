// const app = require('commander');
const chalk = require('chalk');
// const clear = require('clear');
// const figlet = require('figlet');
// const inquirer = require('inquirer');

const question = [{
	name: 'proceed',
	type: 'input',
	message: 'Proceed to push this project to a Github remote repo?',
	choices: ['Yes', 'No'],
	default: 'Yes'
}];

module.exports = async () => {

	const answer = await inquirer.prompt(question);

	if(answer.proceed == "Yes"){
		//proceed with Github authentication, creating the repo, etc.
		 console.log(chalk.gray("Authenticating..."))
 }else{
		 //show exit message
		 console.log(chalk.gray("Okay, bye."))
 }
}
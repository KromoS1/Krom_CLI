const welcome = require('cli-welcome');
const unhandled = require('cli-handle-unhandled');
const config = require('./config');
const chalk = require('chalk');
const figlet = require('figlet');

class Initialize {

	static greetings() {
	
		unhandled();
		welcome(config.welcome);

		console.log(
			chalk.cyan(figlet.textSync('K R O M O S', { horizontalLayout: 'full' }))
		);
	}
}

module.exports = {
	Initialize
};

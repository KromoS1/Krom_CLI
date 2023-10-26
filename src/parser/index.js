const { CLI } = require('../app');
const executor = require('../executor');
const confCli = require('../app/config');

class Parser {

	static init() {

		const cli = CLI.cli;

		const current_command = cli.input[0];
		const {command} = confCli;

		switch(current_command) {

			case command.help: {

				cli.showHelp(0);
				break;
			}
			case command.push: {

				executor.push(cli.flags, cli.input[1]);
				break;
			}
			case command.show: {

				executor.show(cli.flags);
				break;
			}
			case command.script: {

				executor.script(cli.flags, cli.input[1]);
				break;
			}
		}
	}
}

module.exports = {
	Parser
}
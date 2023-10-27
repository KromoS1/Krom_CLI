const { CLI } = require('../app');
const {Push, Show, Script} = require('../executor');
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

				Push.execute(cli.flags, cli.input[1]);
				break;
			}
			case command.show: {

				Show.execute(cli.flags);
				break;
			}
			case command.script: {

				Script.execute(cli.flags, cli.input[1]);
				break;
			}
		}
	}
}

module.exports = Parser;
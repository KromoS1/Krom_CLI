const { CLI } = require('../app');
const {GitHub, Show, Script, InitRepo} = require('../executor');
const confCli = require('../app/config');

class Parser {

	static init() {

		const cli = CLI.cli;

		const current_command = cli.input[0];
		const {command} = confCli;

		switch (current_command) {

			case command.help: {

				cli.showHelp(0);
				break;
			}
			case command.initRepo: {

				GitHub.initRepo();
				break;
			}
			case command.push: {

				GitHub.push(cli.flags, cli.input[1]);
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
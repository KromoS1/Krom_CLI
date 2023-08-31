const cli = require('../app/cli');
const executor = require('../executor');
const confCli = require('../app/config');

module.exports = () => {

	const current_command = cli.input[0];
	const {command} = confCli;

	switch(current_command) {

		case command.help: {

			cli.showHelp(0);
			break;
		}
		case command.save: {

			executor.save(cli.input[1]);
			break;
		}
		case command.show: {

			executor.show(cli.flags);
			break;
		}
		case command.run: {

			executor.run(cli.flags, cli.input[1]);
			break;
		}
	}
}
const cli = require('../app/cli');
const executor = require('../executor')
const confCli = require('../app/config')

module.exports = () => {

	const current_command = cli.input[0];
	const {command, flags} = confCli;

	switch(current_command) {

		case command.help: {

			cli.showHelp(0);
			break;
		}
		case command.save: {
			executor.save(cli.input[1]);
		}
	}
}
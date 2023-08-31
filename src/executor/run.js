const { exec,spawn } = require('child_process');
const customLogs = require('../utils/customLogs');
const confCli = require('../app/config');
const chalk = require('chalk');

const getFlagsShell = (flags) => {

	let current_flag = '';

	confCli.flags.shell.forEach(shell => {
		
		if (flags[shell]) {
			current_flag = shell
		}
	});

	return current_flag;
}

module.exports = (flags, file_name) => {

	const type_shell = getFlagsShell(flags);

	customLogs.success('I start execution\n');

	const process_exec = spawn(`${type_shell}`, [`${process.env.PATH_DIR}/${file_name}`]);

	process_exec.stdout.on('data', data => {
		console.log(chalk.bgYellow('Output:'), `\n\n${data}`);
	});

	process_exec.stderr.on('data', data => {
		console.log(chalk.bgRedBright('Error Output:'), chalk.red(`\n\n${data}`));
	});

	process_exec.on('close', code => {
		customLogs.success(`Process completed with code: ${code}`);
	});
};

const { spawn } = require('child_process');
const customLogs = require('../utils/customLogs');
const confCli = require('../app/config');
const chalk = require('chalk');
const dir_path = require('../dir_path');

const getFlagsShell = (flags) => {

	let current_flag = '';

	confCli.flags.shell.forEach(shell => {
		
		if (flags[shell]) {
			current_flag = shell
		}
	});

	return current_flag;
}

module.exports = async (flags, file_name) => {

	const type_shell = getFlagsShell(flags);
	const path = await dir_path.get();

	customLogs.success('I start execution\n');

	const process_exec = spawn(`${type_shell}`, [`${path}/${file_name}`]);

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

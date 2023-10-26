const { consoleSpawnScript } = require('../utils/spawn');
const customLogs = require('../utils/customLogs');
const confCli = require('../app/config');
const { APP_DIR, PATH_SCRIPTS } = require('../variable')

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
	const path = APP_DIR + PATH_SCRIPTS;

	customLogs.success('I start execution\n');

	await consoleSpawnScript(`${type_shell} ${path}/${file_name}`);
};

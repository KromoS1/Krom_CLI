const { consoleSpawnScript } = require('../utils/spawn');
const customLogs = require('../utils/customLogs');
const confCli = require('../app/config');
const { APP_DIR, PATH_SCRIPTS } = require('../variable')


class Script {

	static #getFlagsShell(flags) {

		let current_flag = '';
	
		confCli.flags.shell.forEach(shell => {
	
			if (flags[shell]) {
				current_flag = shell
			}
		});
	
		return current_flag;
	}

	static async execute(flags, file_name) {

		const type_shell = Script.#getFlagsShell(flags);
		const path = APP_DIR + PATH_SCRIPTS;

		customLogs.success('I start execution\n');

		await consoleSpawnScript(`${type_shell} ${path}/${file_name}`);
	}
}

module.exports = Script;

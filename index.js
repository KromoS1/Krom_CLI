#!/usr/bin/env node

/**
 * Kromos
 * my cli command
 *
 * @author Roman Shaulinski <none>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const chalk = require("chalk");
const figlet = require('figlet');
const executor = require("./utils/executor");

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const helloUser = () => {
	console.log(
		chalk.cyan(
			figlet.textSync('Kromos', { horizontalLayout: 'full' })
		)
	);
}

const checkOneProject = () => {

	input.includes('build') && flags.one && flags.projectName && executor.builtSchoolApi(input[1])
}

(async () => {
	init({ clear });


	helloUser();
	checkOneProject();

	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);
})();

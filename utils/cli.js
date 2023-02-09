const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	one: {
		type: `boolean`,
		default: false,
		alias: `o`,
		desc: `One Project update`
	},
	two: {
		type: `boolean`,
		default: false,
		alias: `t`,
		desc: `Two project update`
	},
	projectName: {
		type: `boolean`,
		default: false,
		alias: `n`,
		desc: `Name Project`
	},
};

const commands = {
	help: { desc: `Print help info` },
	build: {desc: 'Command for build Project'}
};

const helpText = meowHelp({
	name: `krom`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);

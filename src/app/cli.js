const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	sh: {
		type: `boolean`,
		default: false,
		desc: `Command line shell -> Bourne shell`
	},
	bash: {
		type: `boolean`,
		default: false,
		desc: `Command line shell -> Bourne-again shell`
	},
	zh: {
		type: `boolean`,
		default: false,
		desc: `Command line shell -> zsh`
	},
	path: {
		type: `boolean`,
		default: false,
		alias: `p`,
		desc: `Use to view the actual directory path`
	},
	files: {
		type: `boolean`,
		default: false,
		alias: `f`,
		desc: `Use to view a list of executable files in a directory`
	},
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	}
};

const commands = {
	run: { desc: 'Starts the execution of the executable file' },
	save: { desc: 'Saves the path to the directory with executable files.' },
	show: {
		desc: 'Shows the actual path to the directory with executable files'
	},
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `krom`,
	flags,
	commands,
	examples: [
		{
			command: `run <filen_name>`,
			flags: [`bash`]
		},
		{
			command: `save <path>`,
		},
		{
			command: 'show',
			flags: ['path','files']
		}
	]
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
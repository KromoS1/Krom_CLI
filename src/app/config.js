const pkg = require('../../package.json');

const confCommands = {
	template: { desc: 'Starts template creation' },
	push: { desc: 'Push commits project.' },
	init_repo: { desc: 'Initialize repository in GitHub' },
	show: {
		desc: 'Shows the actual path to the directory with executable files'
	},
	help: { desc: `Print help info` }
};

const confFlags = {
	files: {
		type: `boolean`,
		default: false,
		alias: `f`,
		desc: `Use to view a list of executable files in a directory`
	},
	message: {
		type: `boolean`,
		default: false,
		alias: `m`,
		desc: `Message for commit`
	}
};

module.exports = {
	command: {
		template: 'template',
		initRepo: 'init_repo',
		push: 'push',
		show: 'show',
		help: 'help'
	},
	flags: {
		all: ['files', 'message']
	},

	confHelp: {
		name: `krom`,
		flags: confFlags,
		commands: confCommands,
		examples: [
			{
				command: `template <file_name>`
			},
			{
				command: `push`,
				flags: [`message`]
			},
			{
				command: `init_repo`
			},
			{
				command: 'show',
				flags: ['files']
			}
		]
	},
	options: {
		inferType: true,
		description: false,
		hardRejection: false,
		flags: confFlags
	},
	welcome: {
		title: `Kromos`,
		tagLine: `by Roman Shaulinski`,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear: true
	}
};

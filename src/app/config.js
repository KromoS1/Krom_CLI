const pkg = require('../../package.json');

const confCommands = {
	template: { desc: 'Starts template creation' },
	init_repo: { desc: 'Initialize repository in GitHub' },
	push: { desc: 'Push commits project.' },
	show: {
		desc: 'Shows data depending on the flag'
	},
	help: { desc: `Print help info` }
};

const confFlags = {
	templates: {
		type: `boolean`,
		default: false,
		alias: `t`,
		desc: `Used to view a list of available templates`
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
		all: ['templates', 'message']
	},

	confHelp: {
		name: `krom`,
		flags: confFlags,
		commands: confCommands,
		examples: [
			{
				command: `template <template_name>`
			},
			{
				command: `init_repo`
			},
			{
				command: `push`,
				flags: [`message`]
			},
			{
				command: 'show',
				flags: ['templates']
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

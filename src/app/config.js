const pkg = require('../../package.json');

const confCommands = {
	script: { desc: 'use bash scripts' },
	push: { desc: 'Push commits project.' },
	init: { desc:'Initialize repository in GitHub'},
	show: { desc: 'Shows the actual path to the directory with executable files' },
	help: { desc: `Print help info` }
}

const confFlags = {
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
}

module.exports = {
	command: {
		script: 'script',
		init: 'init',
		push: 'push',
		show: 'show',
		help: 'help'
	},
	flags: {
		all: ['sh', 'bash', 'zh', 'path', 'files', 'message'],
		shell: ['sh', 'bash', 'zh']
	},
	
	confHelp: {
		name: `krom`,
		flags: confFlags,
		commands: confCommands,
		examples: [
			{
				command: `script <filen_name>`,
				flags: [`bash`]
			},
			{
				command: `push`,
				flags: [`message`]
			},
			{
				command: `init`,
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
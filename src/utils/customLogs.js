const chalk = require('chalk');

module.exports = {
	log: (message, color) =>
		console.log(
			chalk[color ?? 'white'](message)
		),
	success: (message, bg, color) =>
		console.log(
			chalk[bg ?? 'bgGreenBright'](chalk[color ?? 'black'](message))
		),
	warning: (message, bg, color) =>
		console.log(
			chalk[bg ?? 'bgYellowBright'](chalk[color ?? 'black'](message))
		),
	error: (message, bg, color) =>
		console.log(
			chalk[bg ?? 'bgRedBright'](chalk[color ?? 'black'](message))
		)
};
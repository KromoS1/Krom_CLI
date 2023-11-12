const chalk = require('chalk');

module.exports = {
	log: (message, color) => console.log(chalk[color || 'white'](message)),
	success: (message, bg, color) =>
		console.log(chalk[color ?? 'green'](message)),
	warning: (message, bg, color) =>
		console.log(chalk[color ?? 'yellow'](message)),
	error: (message, bg, color) => console.log(chalk[color ?? 'red'](message))
};

const chalk = require('chalk');
const figlet = require('figlet');

module.exports = () => {
	console.log(
		chalk.cyan(figlet.textSync('K R O M O S', { horizontalLayout: 'full' }))
	);
};

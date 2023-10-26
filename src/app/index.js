const {Initialize} = require('./initialize');
const meow = require('meow');
const meowHelp = require('cli-meow-help');
const config = require('./config');

class CLI {

	static cli = null;

	static init() {
		console.log(Initialize, 'dddd')
		Initialize.greetings()

		const helpText = meowHelp(config.confHelp);

		this.cli = meow(helpText, config.options);
	}
}

module.exports = {
	CLI
}
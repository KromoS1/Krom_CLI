const { Initialize } = require('./initialize');
const meow = require('meow');
const meowHelp = require('cli-meow-help');
const config = require('./config');
const getCommandOS = require('../utils/getCommandOS');

class CLI {
	static cli = null;

	static init() {
		getCommandOS();

		Initialize.greetings();

		const helpText = meowHelp(config.confHelp);

		this.cli = meow(helpText, config.options);
	}
}

module.exports = {
	CLI
};

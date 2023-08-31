const init = require('./init');
const cli  = require('./cli');
const greetings = require('./lib/greetings')
const parser = require('../parser')

module.exports = () => {
	init(cli.flags.clear);
	greetings();
	parser();
};

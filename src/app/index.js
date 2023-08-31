const init = require('./init');
const greetings = require('./lib/greetings')
const parser = require('../parser')

module.exports = () => {
	init();
	greetings();
	parser();
};

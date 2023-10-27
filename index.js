#!/usr/bin/env node

const { CLI } = require('./src/app');
const Parser = require('./src/parser');

(async () => {

	CLI.init()
	Parser.init()

})();

#!/usr/bin/env node

const { CLI } = require('./src/app');
const Parser = require('./src/parser');
const path = require('path');

(async () => {
	process.env.APP_DIR = path.resolve(__dirname);

	CLI.init();
	Parser.init();
})();

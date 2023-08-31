#!/usr/bin/env node

const chalk  = require('chalk');
const figlet = require('figlet');

const app = require('./src/app');
const cli  = require('./src/app/cli');

// const executor = require("./utils/executor");
// const customLog = require('./utils/customLogs');
// const ncp = require('node-clipboardy');

// const input = cli.input;
// const flags = cli.flags;
// const { clear, debug } = flags;



(async () => {

	app();
	

	// flags.link && await parseInput(input)

	// input.includes(`help`) && cli.showHelp(0);
	// debug && log(flags);
})();

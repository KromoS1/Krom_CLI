#!/usr/bin/env node
require('dotenv').config()
const app = require('./src/app');

(async () => {

	app();
	
})();

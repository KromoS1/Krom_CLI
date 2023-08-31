const fs = require('fs');
const customLogs = require('../utils/customLogs');

module.exports = path => {
	if (fs.existsSync(path)) {

		process.env.PATH_DIR = path;

		customLogs.success('Path to your directory saved');
	} else {
		customLogs.error('Directory does not exist')
	}
};

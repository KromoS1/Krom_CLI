const fs = require('fs');
const customLogs = require('../utils/customLogs');
const dir_path = require('../dir_path');

module.exports = async path => {
	if (fs.existsSync(path)) {

		const res_path = await dir_path.set(path);

		customLogs.success('Path to your directory saved\n');
		customLogs.log(`Your path -> ${res_path}`);

	} else {
		customLogs.error('Directory does not exist')
	}
};

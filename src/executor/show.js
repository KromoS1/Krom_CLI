const fs = require('fs');
const customLogs = require('../utils/customLogs');
const dir_path = require('../dir_path');

module.exports = async flags => {

	const path = await dir_path.get();

	if(flags.path && flags.files) {
		customLogs.warning('Use one of the flags')
		return;
	}

	if(flags.path) {
		
		customLogs.log(`----> ${path}\n`, 'yellow');
		return;
	}

	if (flags.files) {

		fs.readdir(`${path}`, (err, files) => {
			
			if (err) {
				customLogs.error('Directory read error');
				customLogs.log(err);
				return;
			}

			files.forEach(file => {
				customLogs.log(`----> ${file}\n`, 'blue');
			});
		});
		
		return;
	}
};

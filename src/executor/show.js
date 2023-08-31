const fs = require('fs');
const customLogs = require('../utils/customLogs');

module.exports = flags => {

	if(flags.path && flags.files) {
		customLogs.warning('Use one of the flags')
		return;
	}

	if(flags.path) {

		customLogs.log(`----> ${process.env.PATH_DIR}\n`, 'yellow');
		return;
	}

	if (flags.files) {

		fs.readdir(`${process.env.PATH_DIR}`, (err, files) => {
			
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

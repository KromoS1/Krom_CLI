const fs = require('fs');
const customLogs = require('../utils/customLogs');
const { PATH_SCRIPTS } = require('../variable');

class Show {
	static async execute(flags) {
		const path = process.env.APP_DIR + PATH_SCRIPTS;

		if (flags.path && flags.files) {
			customLogs.warning('Use one of the flags');
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
	}
}

module.exports = Show;

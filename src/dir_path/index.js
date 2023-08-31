const fs = require('fs');
const customLogs = require('../utils/customLogs');

module.exports = {
	get: () => {
		return new Promise((res,rej) => {
			fs.readFile('dir_path.txt', 'utf8', (err, data) => {
				if (err) {
					customLogs.error(err);
					rej();
				}
	
				 res(data.split('=')[1]);
			});
		})
	},

	set: path => {

		return new Promise((res,rej) => {
			fs.readFile('dir_path.txt', 'utf8', (err, data) => {
				if (err) {
					customLogs.error(err);
					rej();
				}
			
				const modifiedData = `dir_path=${path}`;
			
				fs.writeFile('dir_path.txt', modifiedData, 'utf8', err => {
					if (err) {
						customLogs.error(err);
						rej();
					}

					res(path);
				});
			});
		})
	}
};

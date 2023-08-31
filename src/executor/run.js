const { exec } = require('child_process');

const runner_Sh = file_name => {
	console.log(file_name)
	// exec(`bash ./sh_files/${file_name}`, (error, stdout, stderr) => {
	// 	if (error) {
	// 		// customLogs.error(`error: ${error.message}`);
	// 		return;
	// 	}

	// 	if (stderr) {
	// 		// customLogs.error(`stderr: ${stderr}`);
	// 		return;
	// 	}
	// });
};

module.exports = {
	runner_Sh
};

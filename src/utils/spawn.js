const { spawn, exec } = require('child_process');
const customLogs = require('./customLogs');
const chalk = require('chalk');

const consoleSpawnScript = async (commString) => {

	console.log(chalk.bgYellow('Command:'), `\n\n${commString}\n`);

	return new Promise((res, rej) => {

		const arrCommand = commString.split(' ');

		const mainComm = arrCommand[0];
		const otherCommand = arrCommand.slice(1)

		const child = spawn(mainComm, otherCommand, { stdio: 'inherit' });

		child.on('close', code => {
			customLogs.success(`Process completed with code: ${code}`);
		});
	})
}

const consoleSpawn = async (commString) => {

	console.log(chalk.bgYellow('Command:'), `\n\n${commString}\n`);

	return new Promise((res, rej) => {

		const arrCommand = commString.split(' ');

		const mainComm = arrCommand[0];
		const otherCommand = arrCommand.slice(1)

		const child = spawn(mainComm, otherCommand);

		child.stdout.on('data', data => {

			console.log(chalk.bgYellow('Output:'), `\n\n${data}\n`);
			res(`${data}`);
		});

		child.stderr.on('data', data => {

			console.log(chalk.bgRedBright('Error Output:'), chalk.red(`\n\n${data}`));

			rej(data)
		});
	})
}

const consoleExec = async (commString) => {

	console.log(chalk.bgYellow('Command:'), `\n\n${commString}\n`);

	return new Promise((res, rej) => {

		exec(commString, (error, stdout, stderr) => {

			if (error) {
				console.log(chalk.bgRedBright('Error Output:'), chalk.red(`\n\n${error.message}`));
				return;
			}
			if (stderr) {
				console.log(chalk.yellow(`\n\n${stderr}`));
				return;
			}

			console.log(chalk.bgYellow('Output:'), `\n\n${stdout}`);
		});
	})
}

module.exports = {
	consoleSpawn,
	consoleSpawnScript,
	consoleExec
}
const { consoleSpawn, consoleExec } = require('../utils/spawn');
const customLogs = require('../utils/customLogs');
const confCli = require('../app/config');
const chalk = require('chalk');


module.exports = async () => {

	let branch_name = await consoleSpawn("git symbolic-ref --short HEAD");

	branch_name = branch_name.trim();

	if (branch_name == 'main') {

	} else {

		const git_add = 'git add .';
		const local_commit = `git commit -am "${branch_name}"`;
		const local_push = `git push -u origin ${branch_name}`;

		await consoleExec(`${git_add}; ${local_commit}; ${local_push}`)
	}
};

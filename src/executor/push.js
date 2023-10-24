const { consoleSpawn, consoleExec } = require('../utils/spawn');
const customLogs = require('../utils/customLogs');
const confCli = require('../app/config');
const chalk = require('chalk');


module.exports = async () => {

	const branch_name = await consoleSpawn("git symbolic-ref --short HEAD");

	if (branch_name == 'main') {

	} else {

		const local_commit_push = `git add . && git commit -am "${branch_name}" && git push -u origin ${branch_name}`;

		await consoleExec(`${local_commit_push}`);
	}
};

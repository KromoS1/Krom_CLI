const { consoleSpawn, consoleExec } = require('../utils/spawn');

module.exports = async (flags, message) => {

	let branch_name = await consoleSpawn("git symbolic-ref --short HEAD");

	branch_name = branch_name.trim();

	const message_commit = flags.message ? message : branch_name;

	const git_add = 'git add .';
	const local_commit = `git commit -am "${message_commit}"`;
	const local_push = `git push -u origin ${branch_name}`;

	await consoleExec(`${git_add}; ${local_commit}; ${local_push}`)
};

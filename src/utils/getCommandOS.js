const platform = process.platform;

module.exports = () => {
	switch (platform) {
		case 'win32':
			process.env.COMMAND = 'bash';
			break;
		case 'darwin':
		case 'linux':
			process.env.COMMAND = 'sh';
			break;
	}
};

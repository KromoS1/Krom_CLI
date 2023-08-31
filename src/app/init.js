const welcome = require('cli-welcome');
const pkg = require('../../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = () => {
	unhandled();
	welcome({
		title: `Kromos`,
		tagLine: `by Roman Shaulinski`,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear: true
	});
};

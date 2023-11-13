const customLogs = require('../utils/customLogs');

const available_templates = ['react', 'react-native'];

class Show {
	static async execute(flags) {
		if (flags.templates) {
			available_templates.forEach(temp =>
				customLogs.log(`<--- ${temp} --->\n`, 'yellow')
			);
		}
	}
}

module.exports = Show;

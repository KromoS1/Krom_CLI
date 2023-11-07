const ora = require('ora');
const cliSpinners = require('cli-spinners');

class Loader {
	#spinner = null;

	constructor() {
		this.#spinner = this.#createSpinner();
	}

	#createSpinner() {
		return ora({
			text: 'Loading',
			spinner: cliSpinners.fingerDance
		});
	}

	start() {
		if (this.#spinner) {
			this.#spinner.start();
		}
	}

	stop() {
		if (this.#spinner) {
			this.#spinner.stop();
		}
	}
}

module.exports = { Loader };

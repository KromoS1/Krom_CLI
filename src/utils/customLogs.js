const chalk = require('chalk');

module.exports = {
    success: (message) => console.log(chalk.bgGreenBright(chalk.black(message))),
    warning: (message) => console.log(chalk.bgYellowBright(chalk.black(message))),
    error: (message) => console.log(chalk.bgRedBright(chalk.black(message))),
}
const {exec} = require('child_process');
const customLogs = require('./customLogs');

const builtSchoolApi = (nameProject) => {

    customLogs.success("Start build")

    exec('cd school_meals_dev/'+nameProject+' git checkout . && git checkout main && git pull && npm run build && pm2 restart', (error, stdout, stderr) => {
        if (error) {
            customLogs.error(`error: ${error.message}`)
            return;
        }

        if (stderr) {
            customLogs.error(`stderr: ${stderr}`)
            return;
        }

        customLogs.success(`stdout:\n${stdout}`)
    })
}

module.exports = {
    builtSchoolApi
}
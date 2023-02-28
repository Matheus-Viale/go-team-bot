import chalk = require('chalk');

module.exports = {
    name: 'connected',
    execute(){
        console.log(chalk.green('[Status do Banco de Dados]: Connectado!'))
    },
};
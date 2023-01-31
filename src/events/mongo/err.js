const chalk = require('chalk');

module.exports = {
    name: 'err',
    execute(err){
        console.log(chalk.red(`[Status do Banco de Dados]: Ocorreu um erro inesperado!\n${err}`));
    },
};
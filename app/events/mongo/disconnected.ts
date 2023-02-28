import chalk = require('chalk');

module.exports = {
    name: 'disconnected',
    execute(){
        console.log(chalk.yellow('[Status do Banco de Dados]: Desconectado!'))
    },
};
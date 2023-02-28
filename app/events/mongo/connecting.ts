import chalk = require('chalk');

module.exports = {
    name: 'connecting',
    async execute(){
        console.log(chalk.cyan('[Status do Banco de Dados]: Conectando...'))
    },
};
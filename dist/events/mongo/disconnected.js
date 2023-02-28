"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
module.exports = {
    name: 'disconnected',
    execute() {
        console.log(chalk.yellow('[Status do Banco de Dados]: Desconectado!'));
    },
};

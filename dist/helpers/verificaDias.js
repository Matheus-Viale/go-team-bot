"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verificaDias(diaStringAgendamento) {
    const diaAtual = [new Date().getDay()];
    let liberarAgendamento = false;
    let diaAgendamento = 0;
    if (diaAtual[0] == 0)
        diaAtual.push('Domingo');
    if (diaAtual[0] == 1)
        diaAtual.push('Segunda-Feira');
    if (diaAtual[0] == 2)
        diaAtual.push('Terça-Feira');
    if (diaAtual[0] == 3)
        diaAtual.push('Quarta-Feira');
    if (diaAtual[0] == 4)
        diaAtual.push('Quinta-Feira');
    if (diaAtual[0] == 5)
        diaAtual.push('Sexta-Feira');
    if (diaAtual[0] == 6)
        diaAtual.push('Sábado');
    if (diaAtual[1] == diaStringAgendamento) {
        liberarAgendamento = true;
    }
    if (diaAtual[1] == 'Domingo' && diaStringAgendamento == 'Segunda-Feira') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    if (diaAtual[1] == 'Segunda-Feira' && diaStringAgendamento == 'Terça-Feira') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    if (diaAtual[1] == 'Terça-Feira' && diaStringAgendamento == 'Quarta-Feira') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    if (diaAtual[1] == 'Quarta-Feira' && diaStringAgendamento == 'Quinta-Feira') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    if (diaAtual[1] == 'Quinta-Feira' && diaStringAgendamento == 'Sexta-Feira') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    if (diaAtual[1] == 'Sexta-Feira' && diaStringAgendamento == 'Sábado') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    if (diaAtual[1] == 'Sábado' && diaStringAgendamento == 'Domingo') {
        liberarAgendamento = true;
        diaAgendamento = 1;
    }
    return {
        liberarAgendamento,
        diaAgendamento
    };
}
exports.default = verificaDias;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botWppInitialize_1 = require("../wpp/botWppInitialize");
const { grupoWpp } = require('../globalVariables.js');
function enviaMensagemAberturaWpp() {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const diaAgenda = date.getDay() + 1;
        let diaAgendaString;
        if (diaAgenda == 1)
            diaAgendaString = 'SEGUNDA';
        if (diaAgenda == 2)
            diaAgendaString = 'TERÇA';
        if (diaAgenda == 3)
            diaAgendaString = 'QUARTA';
        if (diaAgenda == 4)
            diaAgendaString = 'QUINTA';
        if (diaAgenda == 5)
            diaAgendaString = 'SEXTA';
        if (diaAgenda == 6)
            diaAgendaString = 'SÁBADO';
        if (diaAgenda == 7)
            diaAgendaString = 'DOMINGO';
        const mensagem = `AGENDA DE ${diaAgendaString} ABERTA\n\nHorário\nA solicitação de agendamento pode ser feita das 12:00 às 21:00 (BR) / 15:00 às 00:00 (PT), e os agendamento são para o dia seguinte\n\nComo solicitar?\nBasta digitar o comando "/solicitaragendamento" no Discord e selecionar as opções de dia e hora.\n\nRequisitos para agendar:\n\n1. Estar acompanhando as lives!\n2. Não possuir advertências nos últimos 15 dias!\n3. Se esses dois requisitos estiverem atendidos o agendamento é livre, porém a aprovação dele dependerá dos requisitos prioritários (conferir os requisitos prioritários no Discord) se outro streamer tiver interesse no mesmo horário!`;
        yield botWppInitialize_1.clientWpp.sendMessage(grupoWpp, mensagem);
    });
}
exports.default = enviaMensagemAberturaWpp;

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
function enviaMensagemFechamentoWpp() {
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
        const mensagem = `AGENDA DE ${diaAgendaString} FECHADA\n\nRetorno?\nEm breve a STAFF irá avaliar as solicitações e você receberá um aviso do bot com o retorno!\n\nAVISO!\nFavor, habilitar o recebimento de mensagens diretas no servidor do Discord para poder receber as notificações do BOT via DM do Discord. (Não se preocupe, não fazemos SPAM)\n\nLegenda das Reações\n ✅ - Significa que o streamer teve seu agendamento confirmado para a data e hora marcada!\n 🏳️ - Significa que o streamer desistiu do agendamento!\n ⚠️ - Significa que o streamer teve seu agendamento recusado pois possui uma advertência nos últimos 15 dias!\n 🚫 - Significa que o streamer teve seu agendamento recusado pois possui uma baixa presença nas lives!\n ⛔ - Significa que o streamer teve seu agendamento recusado pois outro streamer tem a prioridade maior!`;
        yield botWppInitialize_1.clientWpp.sendMessage(grupoWpp, mensagem);
    });
}
exports.default = enviaMensagemFechamentoWpp;

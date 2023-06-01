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
const discord_js_1 = require("discord.js");
const { channelMarcarTwitch, roleStreamerGoTeam } = require('../globalVariables.js');
const enviaMensagemAbertura = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const channelSelect = yield client.channels.fetch(channelMarcarTwitch);
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
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(0x6441A5)
        .setTitle(`AGENDA DE ${diaAgendaString} ABERTA`)
        .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
        .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
        .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Horário', value: `A solicitação de agendamento pode ser feita das 12:00 às 21:00 (BR) / 15:00 às 00:00 (PT), e os agendamento são para o dia seguinte` }, { name: '\u200B', value: `\u200B` }, { name: 'Como solicitar?', value: 'Basta digitar o comando "/solicitaragendamento" e selecionar as opções de dia e hora' }, { name: 'Preenchimento?', value: 'Caso tenha passado do horário de solicitações e a STAFF informou que existem horários disponíves, basta enviar a sua solicitação normalmente!' }, { name: 'AVISO!', value: 'O uso da opção de preenchimento sem autorização da STAFF resultará em advertência!' }, { name: '\u200B', value: `\u200B` }, { name: 'Requisitos para agendar!', value: '\u200B' }, { name: '\u200B', value: 'Estar acompanhando as lives!' }, { name: '\u200B', value: 'Não possuir advertências nos últimos 15 dias!' }, { name: '\u200B', value: 'Se esses dois requisitos estiverem atendidos o agendamento é livre, porém a aprovação dele dependerá dos requisitos prioritários se outro streamer tiver interesse no mesmo horário!' }, { name: '\u200B', value: '\u200B' }, { name: 'Requisitos Prioritários (em ordem de peso)', value: '\u200B' }, { name: '\u200B', value: 'O Streamer que ainda não tiver realizado live na semana terá prioridade máxima!' }, { name: '\u200B', value: 'O Streamer que tiver realizado menos lives na semana!' }, { name: '\u200B', value: 'O Streamer que tiver realizado live a mais tempo na semana!' }, { name: '\u200B', value: 'O Streamer que estiver com a melhor média de presença!' }, { name: '\u200B', value: 'O Streamer que tiver realizado a solicitação antes!' }, { name: '\u200B', value: '\u200B' }, { name: 'Dúvidas?', value: 'Entre em contato com a STAFF!' });
    channelSelect.send({
        embeds: [embed],
        content: `<@&${roleStreamerGoTeam}>\nAGENDA DE ${diaAgendaString} ABERTA`
    });
});
exports.default = enviaMensagemAbertura;

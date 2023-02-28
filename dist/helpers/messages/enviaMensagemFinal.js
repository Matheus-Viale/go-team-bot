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
const { channelNotificacoesStreamer } = require('../globalVariables.js');
const enviaMensagemFinal = (streamer, horaAgendamento, streamerId, streamerRaid, client) => __awaiter(void 0, void 0, void 0, function* () {
    const streamerUser = yield client.users.fetch(streamerId);
    const channelNotificacoesFetch = yield client.channels.fetch(channelNotificacoesStreamer);
    if (streamerRaid == 'ultimo') {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
            .setTitle('Último horário!')
            .setDescription(`${streamer}, você está no último horário da nossa agenda, pode prosseguir com a live até o horário que desejar`);
        streamerUser.send({
            embeds: [embed]
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `<@${streamerId}>`,
                embeds: [embed]
            });
        });
        return;
    }
    if (streamerRaid == 'nenhum') {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
            .setTitle('Horário vago!')
            .setDescription(`${streamer}, o horário das ${horaAgendamento + 2}:00 está vago, você pode continuar a sua live até às ${horaAgendamento + 4}:00 se assim desejar, se não tiver condições de prosseguir a live, basta enviar o raid para o matheus_rib3, desta maneira /raid matheus_rib3`);
        streamerUser.send({
            embeds: [embed]
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `<@${streamerId}>`,
                embeds: [embed]
            });
        });
        return;
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(0x6441A5)
        .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
        .setTitle('Próximo Streamer!')
        .setDescription(`${streamer}, como foi a sua live? Tudo certo?, só vim pra avisar que estamos quase no horário do ${streamerRaid}, por favor, verifique se ele já se encontra online e realize a raid através de /raid ${streamerRaid}, se ele estiver offline, entre em contato com a STAFF imediatamente!`);
    streamerUser.send({
        embeds: [embed]
    }).catch(error => {
        channelNotificacoesFetch.send({
            content: `<@${streamerId}>`,
            embeds: [embed]
        });
    });
});
exports.default = enviaMensagemFinal;

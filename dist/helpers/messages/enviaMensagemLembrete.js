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
const verifyUserIsOnlineTwitch_1 = require("../verifyUserIsOnlineTwitch");
const { channelNotificacoesStreamer } = require('../globalVariables.js');
const enviaMensagemLembrete = (streamer, horaAgendamento, streamerId, client) => __awaiter(void 0, void 0, void 0, function* () {
    const streamerUser = yield client.users.fetch(streamerId);
    const channelNotificacoesFetch = yield client.channels.fetch(channelNotificacoesStreamer);
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(0x6441A5)
        .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
        .setTitle('Live Offline!')
        .setDescription(`Olá ${streamer}, vimos que você ainda não está online para a sua live agendada às ${horaAgendamento}:00, caso não consiga abrir a live avise a STAFF imediatamente!`);
    if ((yield (0, verifyUserIsOnlineTwitch_1.default)(streamer)) == 'offline') {
        streamerUser.send({
            embeds: [embed]
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `<@${streamerId}>`,
                embeds: [embed]
            });
        });
    }
});
exports.default = enviaMensagemLembrete;

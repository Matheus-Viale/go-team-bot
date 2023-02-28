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
const getTwitchAvatar_js_1 = require("../getTwitchAvatar.js");
const { channelLiveTwitch, roleEveryone, guildId } = require('../globalVariables.js');
const enviaMensagemLive = (streamer, horaAgendamento, client) => __awaiter(void 0, void 0, void 0, function* () {
    const channelSelect = yield client.channels.fetch(channelLiveTwitch);
    let streamerAvatar = yield (0, getTwitchAvatar_js_1.default)(streamer);
    if (streamerAvatar == 'sem imagem') {
        streamerAvatar = 'https://i.imgur.com/j1yOXKJ.png';
    }
    const guild = yield client.guilds.fetch(guildId);
    const roleEveryoneFetch = yield guild.roles.fetch(roleEveryone);
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(0x6441A5)
        .setTitle('LIVE AGENDADA')
        .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
        .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
        .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Horário', value: `⏰ ${horaAgendamento}:00 às ${horaAgendamento + 2}:00 ⏰`, }, { name: '\u200B', value: '\u200B' }, { name: 'Regras para acompanhar a live!', value: '\u200B' }, { name: '\u200B', value: '\u200B' }, { name: '\u200B', value: 'Não deixe a live mutada!' }, { name: '\u200B', value: 'Lembramos que a presença é feita atráves dos usuários do chat!' }, { name: '\u200B', value: 'Sempre que possível interaja no chat, gentileza gera gentileza!' }, { name: '\u200B', value: 'Não peça follow e afins no chat dos outros, isso incomoda e não dá resultados!' }, { name: '\u200B', value: '\u200B' }, { name: 'Vai deixar em lurk?', value: '\u200B' }, { name: '\u200B', value: 'Então acesse https://autolurk.000webhostapp.com para garantir que sempre estará presentes nas lives e não dependa das Raids!' }, { name: '\u200B', value: '\u200B' }, { name: 'Streamer', value: `https://twitch.tv/${streamer}` })
        .setImage(streamerAvatar);
    channelSelect.send({
        embeds: [embed],
        content: `${roleEveryoneFetch}\nStreamer agendado das ${horaAgendamento}:00`
    });
});
exports.default = enviaMensagemLive;

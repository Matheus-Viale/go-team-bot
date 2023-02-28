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
const { channelJustificativaFaltaStaff, roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'justificativa-falta'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const streamer = interaction.member;
            const streamerNickname = streamer.nickname;
            const streamerAvatar = streamer.user.avatarURL();
            const channel = yield client.channels.fetch(channelJustificativaFaltaStaff);
            const justificativaFalta = interaction.fields.getTextInputValue('justificativaFaltaInput');
            const dateString = new Date().toLocaleDateString();
            const timeString = new Date().toLocaleTimeString();
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xdaa520)
                .setTitle(streamerNickname)
                .setAuthor({ name: 'Justificativa de Falta', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setThumbnail(streamerAvatar)
                .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Justificativa', value: justificativaFalta }, { name: '\u200B', value: '\u200B' })
                .setFooter({ text: dateString + ' - ' + timeString });
            yield channel.send({
                content: `<@&${roleResponsavelTwitch}>`,
                embeds: [embed]
            });
            yield interaction.editReply({
                content: `${streamerNickname}, sua justificativa de falta foi enviada para staff, agradecemos o aviso!`
            });
        });
    }
};

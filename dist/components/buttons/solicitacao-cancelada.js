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
const { channelMarcarTwitch, channelNotificacoesStreamer } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'solicitacao-cancelada'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const channelNotificacoesFetch = yield client.channels.fetch(channelNotificacoesStreamer);
            const aprovadorUser = interaction.user.username;
            const footerText = interaction.message.embeds[0].data.footer.text;
            const streamerId = footerText.split('/')[0];
            const messageUserId = footerText.split('/')[1];
            const streamerTwitch = interaction.message.embeds[0].data.title;
            const streamerNick = streamerTwitch.split('/')[1];
            const messageStaff = interaction.message;
            const channel = yield client.channels.fetch(channelMarcarTwitch);
            const messageUser = yield channel.messages.fetch(messageUserId);
            const streamerUser = yield client.users.fetch(streamerId);
            const dia = interaction.message.embeds[0].data.fields[1].value;
            const horario = interaction.message.embeds[0].data.fields[2].value;
            messageStaff.embeds[0].data.author.name = 'Solicitação CANCELADA';
            messageStaff.embeds[0].data.color = 0xffffff;
            messageUser.embeds[0].data.color = 0xffffff;
            /*interaction.message.components[0].components[0].data.disabled = true;
            interaction.message.components[0].components[1].data.disabled = true;
            interaction.message.components[0].components[2].data.disabled = true;
            interaction.message.components[1].components[0].data.disabled = true;*/
            yield interaction.update({
                content: `${aprovadorUser} cancelou a solicitação de ${streamerTwitch}, para ${dia} às ${horario} a pedido do streamer!`,
                embeds: messageStaff.embeds,
                components: []
            });
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xffffff)
                .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setTitle('Solicitação de agendamento cancelada!')
                .setDescription(`${streamerNick}, o seu agendamento para ${dia} às ${horario}(BR) foi cancelado conforme solicitado!\nVocê pode realizar o agendamento para um novo horário se desejar!`);
            streamerUser.send({
                embeds: [embed]
            }).catch(error => {
                channelNotificacoesFetch.send({
                    content: `<@${streamerId}>`,
                    embeds: [embed]
                });
            });
            messageUser.edit({
                embeds: messageUser.embeds
            });
            messageStaff.react('🏳️');
            messageUser.react('🏳️');
        });
    }
};

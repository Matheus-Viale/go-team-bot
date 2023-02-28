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
const agendaSolicitacaoAprovada_1 = require("../../helpers/agendaSolicitacaoAprovada");
const { channelMarcarTwitch, channelNotificacoesStreamer } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'solicitacao-aprovada'
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
            const statusAgendamento = yield (0, agendaSolicitacaoAprovada_1.default)(streamerId, streamerTwitch, dia, horario, client);
            if (statusAgendamento == 'INVALIDO') {
                interaction.reply({
                    content: `Não foi possível realizar o agendamento pois o dia ${dia}, não é valido para agendamentos hoje!`,
                    ephemeral: true
                });
                return;
            }
            if (statusAgendamento == 'OCUPADO') {
                interaction.reply({
                    content: `Não foi possível realizar o agendamento pois o dia ${dia} no horário das ${horario}, já está preenchido!`,
                    ephemeral: true
                });
                return;
            }
            if (statusAgendamento == 'SUCESSO') {
                messageStaff.embeds[0].data.author.name = 'Solicitação APROVADA';
                messageStaff.embeds[0].data.color = 0x03c03c;
                messageUser.embeds[0].data.color = 0x03c03c;
                interaction.update({
                    content: `${aprovadorUser} aprovou a live de ${streamerTwitch}, para ${dia} às ${horario}`,
                    embeds: messageStaff.embeds,
                    components: []
                });
                const embed = new discord_js_1.EmbedBuilder()
                    .setColor(0x03c03c)
                    .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                    .setTitle('Solicitação de agendamento aprovada!')
                    .setDescription(`${streamerNick}, o seu agendamento para ${dia} às ${horario}(BR) foi aprovado!\nNão esqueça, caso não consiga realizar a live você pode avisar com até uma hora de antecedência!`);
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
                messageStaff.react('✅');
                messageUser.react('✅');
            }
        });
    }
};

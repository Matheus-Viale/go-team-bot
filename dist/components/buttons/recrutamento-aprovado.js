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
const { roleStreamerGoTeam, roleStreamerTwitch, roleStreamerVisitante, guildId, channelTranscript, channelPrimeirosPassos, channelDuvidasAgenda, channelTicketSuporte } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'recrutamento-aprovado'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitch = interaction.message.embeds[0].fields[0].value;
            const guild = yield client.guilds.fetch(guildId);
            const aprovadorUser = interaction.user.username;
            const memberId = interaction.message.embeds[1].footer.text.split('/')[0];
            const channelTicketId = interaction.message.embeds[1].footer.text.split('/')[1];
            const memberTicket = yield guild.members.fetch(memberId);
            const roleStreamerGoTeamFetch = yield guild.roles.fetch(roleStreamerGoTeam);
            const roleStreamerTwitchFetch = yield guild.roles.fetch(roleStreamerTwitch);
            const roleStreamerVisitanteFetch = yield guild.roles.fetch(roleStreamerVisitante);
            const messageStaff = interaction.message;
            messageStaff.embeds[0].data.title = 'Recrutamento APROVADO';
            messageStaff.embeds[0].data.color = 0x03c03c;
            messageStaff.embeds[1].data.color = 0x03c03c;
            messageStaff.embeds[1].footer.text = `${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString('pt-BR')}`;
            const chanelTicketFetch = yield guild.channels.fetch(channelTicketId).catch((error) => __awaiter(this, void 0, void 0, function* () {
                yield interaction.message.delete();
                interaction.reply({
                    content: `O ticket já foi fechado, você pode ver o relatório no canal <#${channelTranscript}>`,
                    ephemeral: true
                });
            }));
            try {
                yield memberTicket.roles.add(roleStreamerGoTeamFetch);
                yield memberTicket.roles.add(roleStreamerTwitchFetch);
                yield memberTicket.roles.remove(roleStreamerVisitanteFetch);
                yield memberTicket.setNickname(`twitch.tv/${twitch}`);
            }
            catch (error) {
                console.log(error);
                yield interaction.reply({
                    content: 'Houve um erro ao aprovar o recrutamento, a descrição está no console.',
                    ephemeral: true
                });
                return;
            }
            const embedTicket = new discord_js_1.EmbedBuilder()
                .setColor(0x03c03c)
                .setTitle(`${twitch}, seu recrutamento foi aprovado!`)
                .setDescription(`Tudo certo, agora basta ir no canal <#${channelPrimeirosPassos}>, lá você irá encontrar tudo que precisa para começar!\n\nE se ficar qualquer dúvida basta perguntar no canal <#${channelDuvidasAgenda}> ou abrir um ticket no canal <#${channelTicketSuporte}>!\n\nSe tudo ficou entendido basta mandar um ok novamente e iremos encerrar o seu ticket de recrutamento, caso queira, pode aproveitar para tirar suas dúvidas aqui!`);
            chanelTicketFetch.send({
                content: `<@${memberId}>`,
                embeds: [embedTicket]
            });
            interaction.update({
                content: `${aprovadorUser} aprovou o recrutamento de ${twitch}!`,
                embeds: messageStaff.embeds,
                components: []
            });
        });
    }
};

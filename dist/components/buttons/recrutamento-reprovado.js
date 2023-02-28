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
const { roleStreamerGoTeam, guildId, channelTranscript } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'recrutamento-reprovado'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const twitch = interaction.message.embeds[0].fields[0].value;
            const guild = yield client.guilds.fetch(guildId);
            const aprovadorUser = interaction.user.username;
            const memberId = interaction.message.embeds[1].footer.text.split('/')[0];
            const channelTicketId = interaction.message.embeds[1].footer.text.split('/')[1];
            const messageStaff = interaction.message;
            messageStaff.embeds[0].data.title = 'Recrutamento REPROVADO';
            messageStaff.embeds[0].data.color = 0xf44336;
            messageStaff.embeds[1].data.color = 0xf44336;
            messageStaff.embeds[1].footer.text = `${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString('pt-BR')}`;
            const chanelTicketFetch = yield guild.channels.fetch(channelTicketId).catch((error) => __awaiter(this, void 0, void 0, function* () {
                yield interaction.message.delete();
                interaction.reply({
                    content: `O ticket já foi fechado, você pode ver o relatório no canal <#${channelTranscript}>`,
                    ephemeral: true
                });
            }));
            const embedTicket = new discord_js_1.EmbedBuilder()
                .setColor(0xf44336)
                .setTitle(`${twitch}, seu recrutamento foi reprovado!`)
                .setDescription(`Os motivos podem ser um dos abaixo!`)
                .addFields({ name: '\u200B', value: '\u200B' }, { name: `Recusou?`, value: 'Você não estava de acordo com as nossas regras e nossa maneira de trabalhar!' }, { name: '\u200B', value: '\u200B' }, { name: `Quebrou regras?`, value: 'Você quebrou alguma regra do grupo!' }, { name: '\u200B', value: '\u200B' }, { name: `Houve um erro?`, value: 'Se você acredita que houve um engano, envie uma mensagem abaixo, você tem o prazo de 24h para contestar essa decisão.' });
            chanelTicketFetch.send({
                content: `<@${memberId}>`,
                embeds: [embedTicket]
            });
            interaction.update({
                content: `${aprovadorUser} reprovou o recrutamento de ${twitch}!`,
                embeds: messageStaff.embeds,
                components: []
            });
        });
    }
};

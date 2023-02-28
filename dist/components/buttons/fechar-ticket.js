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
const discord_html_transcripts_1 = require("discord-html-transcripts");
const { channelTranscript, roleOpenTicket, roleRecrutador } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'fechar-ticket'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const { guild, channel, message } = interaction;
            const member = interaction.member;
            const memberTicketId = message.embeds[0].footer.text.split(': ')[1];
            const roleOpenTicketFetch = yield guild.roles.fetch(roleOpenTicket);
            const channelTranscriptFetch = yield guild.channels.fetch(channelTranscript);
            const tagNumber = member.user.tag.split('#')[1];
            const dateString = `${new Date().toLocaleDateString('pt-BR')}`;
            if (!member.roles.cache.get(roleRecrutador)) {
                yield interaction.editReply({
                    content: `Você não tem permissão para fechar o ticket!`
                });
                return;
            }
            //TRANSCRIPT
            const transcript = yield (0, discord_html_transcripts_1.createTranscript)(channel, {
                limit: -1,
                returnType: discord_html_transcripts_1.ExportReturnType.Attachment,
                filename: `ticket-${member.user.username}-${tagNumber}-${dateString}.html`
            });
            //EMBED
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(`${channel.name} Fechado`)
                .addFields({ name: 'Criador do Ticket', value: `<@${memberTicketId}>` }, { name: 'Fechou o Ticket', value: `<@${member.id}>` }, { name: 'Data de fechamento do Ticket', value: `${dateString}` });
            channelTranscriptFetch.send({
                embeds: [embed],
                files: [transcript]
            }).catch(error => {
                console.log(error);
                interaction.editReply({
                    content: 'Houve um erro e não consegui enviar a transcrição, favor entrar em contato com a STAFF'
                });
                return;
            });
            try {
                member.roles.remove(roleOpenTicketFetch);
            }
            catch (error) {
                console.log(error);
                interaction.editReply({
                    content: `Houve um erro e não foi possível remover o usuário <@${member.displayName}> do cargo openTicket, favor entrar em contato com a STAFF`
                });
                return;
            }
            try {
                channel.delete();
            }
            catch (error) {
                console.log(error);
                interaction.editReply({
                    content: `Houve um erro e não foi possível remover o canal <#${channel.name}>, favor entrar em contato com a STAFF`
                });
                return;
            }
        });
    }
};

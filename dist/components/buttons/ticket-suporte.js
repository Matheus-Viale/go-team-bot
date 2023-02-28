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
const { roleStreamerGoTeam, roleOpenTicket, categoryTickets, roleEveryone, roleRecrutador } = require('../../helpers/globalVariables.js');
const { verifyUserRoles } = require('../../helpers/verifyUserRoles.js');
module.exports = {
    data: {
        name: 'ticket-suporte'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const { guild } = interaction;
            const member = interaction.member;
            const { ViewChannel, SendMessages, ReadMessageHistory } = discord_js_1.PermissionFlagsBits;
            const memberTagNumber = member.user.tag.split('#')[1];
            const roleOpenTicketFetch = yield guild.roles.fetch(roleOpenTicket);
            if (!(yield verifyUserRoles(member, roleStreamerGoTeam))) {
                yield interaction.editReply({
                    content: 'Você não tem permissão para usar esse recurso!'
                });
                return;
            }
            if (yield verifyUserRoles(member, roleOpenTicket)) {
                yield interaction.editReply({
                    content: `Você já possui um ticket em aberto`
                });
                return;
            }
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setAuthor({ name: member.user.tag, iconURL: yield member.user.avatarURL() })
                .setTitle(`Suporte para ${member.user.username}`)
                .setDescription('Descreva abaixo seu problema, sugestão ou dúvida:')
                .addFields({ name: '\u200B', value: '\u200B' })
                .setFooter({ text: `ID do Usuário: ${member.id}` });
            const buttonFechar = new discord_js_1.ButtonBuilder()
                .setCustomId('fechar-ticket')
                .setEmoji('🔒')
                .setLabel('Fechar Ticket')
                .setStyle(discord_js_1.ButtonStyle.Danger);
            yield guild.channels.create({
                name: `ticket-${member.user.username}-${memberTagNumber}`,
                type: discord_js_1.ChannelType.GuildText,
                parent: categoryTickets,
                permissionOverwrites: [
                    {
                        id: roleEveryone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory]
                    },
                    {
                        id: member.id,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory]
                    },
                    {
                        id: roleRecrutador,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory]
                    }
                ]
            }).then((channel) => __awaiter(this, void 0, void 0, function* () {
                member.roles.add(roleOpenTicketFetch);
                channel.send({
                    embeds: [embed],
                    components: [new discord_js_1.ActionRowBuilder().addComponents([buttonFechar])]
                });
                yield interaction.editReply({
                    content: `Seu ticket foi criado no canal <#${channel.id}>`
                });
            })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                console.log(error);
                yield interaction.editReply({
                    content: 'Houve um erro e não foi possível criar o ticket de recrutamento! Entre em contato com a STAFF!'
                });
                return;
            }));
        });
    }
};

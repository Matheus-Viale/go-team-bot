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
const { verifyUserIsOnlineTwitch } = require("../../helpers/verifyUserIsOnlineTwitch");
const { channelRecrutados, categoryTickets, roleEveryone, roleRecrutador, channelComoFunciona, channelRegras, roleOpenTicket } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'ticket-recrutamento'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            //INFOS DO MODAL
            const { guild } = interaction;
            const member = interaction.member;
            const { ViewChannel, SendMessages, ReadMessageHistory } = discord_js_1.PermissionFlagsBits;
            const memberTagNumber = member.user.tag.split('#')[1];
            const nomeTwitch = interaction.fields.getTextInputValue('nomeTwitch');
            const afiliadoTwitch = interaction.fields.getTextInputValue('afiliadoTwitch');
            const tempoLive = interaction.fields.getTextInputValue('tempoLive');
            const objetivo = interaction.fields.getTextInputValue('objetivo');
            const recomendacao = interaction.fields.getTextInputValue('recomendacao');
            if ((yield verifyUserIsOnlineTwitch(nomeTwitch)) == 'inexistente') {
                yield interaction.editReply({
                    content: `O canal ${nomeTwitch} n??o foi encontrado, verifique se est?? correto!`
                });
                return;
            }
            //INFOS DO CLIENT OU GUILD
            const channelRecrutadosFetch = yield client.channels.fetch(channelRecrutados);
            const roleOpenTicketFetch = yield guild.roles.fetch(roleOpenTicket);
            let channelTicketId;
            try {
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
                    const embedTicket1 = new discord_js_1.EmbedBuilder()
                        .setColor(0x6441A5)
                        .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                        .setTitle(`Recrutamento de <@${member.id}>`)
                        .setDescription(`Ficamos felizes em saber que voc?? tem interesse em fazer parte da nossa equipe, agora vamos passar algumas instru????es e confirmar as informa????es!\n\n`)
                        .addFields({ name: 'Canal informado:', value: `${nomeTwitch}` }, { name: 'J?? ?? afiliado:', value: `${afiliadoTwitch}` }, { name: 'Tempo com Streamer:', value: `${tempoLive}` }, { name: '\u200B', value: 'Se alguma das suas informa????es estiverem incorretas, basta avisar aqui no chat que fecharemos o seu ticket e voc?? poder?? abrir um novo!' }, { name: '\u200B', value: '\u200B' })
                        .setFooter({ text: `ID do Usu??rio: ${member.id}` });
                    const embedTicket2 = new discord_js_1.EmbedBuilder()
                        .setColor(0x6441A5)
                        .setTitle('Pequeno Resumo')
                        .setDescription(`Esperamos que voc?? j?? tenha lido nossos dois canais introdut??rios <#${channelComoFunciona}> e <#${channelRegras}>, caso ainda n??o tenha lido, agora ?? uma boa hora pra ir e n??o ficar com nenhuma d??vida! De qualquer maneira abaixo tem um pequeno resumo de como funciona a agenda.`)
                        .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Configura????o de Privacidade', value: 'Eu, o bot da Go Team converso diretamente com voc??s streamers, ent??o por gentileza, nas op????es na seta ao lado do nome do server na parte superior do discord, v?? em Config de Privacidade e habilite "Mensagens Diretas", para que eu consiga te notificar sobre suas solicita????es e seus agendamentos. (N??o se preocupe, eu n??o fa??o nenhum tipo de SPAM)' }, { name: '\u200B', value: '\u200B' }, { name: 'Como Funciona:', value: `Nosso grupo funciona com agendamento e acompanhamento de lives. Todo dia tem uma agenda com streamers diferentes e voc?? tem que acompanhar ou deixar em "lurk" as lives para poder agendar a sua.\n\nOs hor??rios da nossa agenda s??o de 2 horas.` }, { name: '\u200B', value: '\u200B' }, { name: 'Nossos hor??rios:', value: 'As lives acontecem todos os dias das **10:00** ??s **00:00**, conforme os hor??rios abaixo:\n\n10:00 ??s 12:00\n12:00 ??s 14:00\n14:00 ??s 16:00\n16:00 ??s 18:00\n18:00 ??s 20:00\n20:00 ??s 22:00\n22:00 ??s 00:00' }, { name: '\u200B', value: '\u200B' }, { name: 'Como agendar:', value: 'A agenda abre todos os dias ??s **12:00** e fecha ??s **21:00**, com os agendamentos sempre para o dia seguinte.' }, { name: '\u200B', value: '\u200B' }, { name: 'Requisitos para agendar:', value: 'A ??nica coisa que exigimos obrigatoriamente ?? acompanhar ou deixar em "lurk" as lives, temos uma lista de presen??a que usamos para saber quem est?? colaborando!' }, { name: '\u200B', value: '\u200B' }, { name: 'Voc?? concorda?', value: 'Caso esteja de acordo em participar e colaborar com o grupo, acompanhando as lives dos colegas basta responder com OK e iremos lhe guiar sobre como acompanhar as lives e agendar, al??m de verificar sua presen??a e justificar caso precise se ausentar.' }, { name: '\u200B', value: '\u200B' }, { name: 'D??vidas?', value: 'Caso queira tirar qualquer d??vida antes de aceitar, basta perguntar aqui no chat e algum recrutador ir?? lhe responder assim que poss??vel!' });
                    const buttonFechar = new discord_js_1.ButtonBuilder()
                        .setCustomId('fechar-ticket')
                        .setEmoji('????')
                        .setLabel('Fechar Ticket')
                        .setStyle(discord_js_1.ButtonStyle.Danger);
                    channelTicketId = yield channel.id;
                    yield member.roles.add(roleOpenTicketFetch);
                    yield channel.send({
                        embeds: [embedTicket1],
                        components: [new discord_js_1.ActionRowBuilder().addComponents([buttonFechar])]
                    });
                    yield channel.send({
                        embeds: [embedTicket2]
                    });
                }));
            }
            catch (error) {
                console.log(error);
                yield interaction.editReply({
                    content: 'Houve um erro e n??o foi poss??vel criar o ticket de recrutamento! Entre em contato com a STAFF!'
                });
                return;
            }
            //EMBED
            const embedRecrutados1 = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setAuthor({ name: member.user.tag, iconURL: yield member.user.avatarURL() })
                .setTitle(`Recrutamento de ${member.user.username}`)
                .addFields({ name: 'Canal da Twitch:', value: `${nomeTwitch}` }, { name: 'Afiliado:', value: `${afiliadoTwitch}` }, { name: 'Tempo de Streamer:', value: `${tempoLive}` }, { name: 'Recomenda????o:', value: `${recomendacao}` });
            const embedRecrutados2 = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setTitle('Objetivo:')
                .setDescription(objetivo)
                .addFields({ name: '\u200B', value: '\u200B' })
                .setFooter({ text: `${member.id}/${channelTicketId}` });
            //BOT??ES
            const buttonAprovado = new discord_js_1.ButtonBuilder()
                .setCustomId('recrutamento-aprovado')
                .setLabel('Aprovado')
                .setStyle(discord_js_1.ButtonStyle.Success);
            const buttonReprovado = new discord_js_1.ButtonBuilder()
                .setCustomId('recrutamento-reprovado')
                .setLabel('Reprovado')
                .setStyle(discord_js_1.ButtonStyle.Danger);
            yield channelRecrutadosFetch.send({
                embeds: [embedRecrutados1, embedRecrutados2],
                components: [new discord_js_1.ActionRowBuilder().addComponents([buttonAprovado, buttonReprovado])]
            });
            yield interaction.editReply({
                content: 'Ticket de recrutamento criado com sucesso!'
            });
        });
    }
};

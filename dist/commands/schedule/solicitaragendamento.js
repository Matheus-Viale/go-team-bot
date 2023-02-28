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
const verificaLivesRecentes_js_1 = require("../../helpers/attendance/verificaLivesRecentes.js");
const verificaMediaPresenca_js_1 = require("../../helpers/attendance/verificaMediaPresenca.js");
const verifyUserRoles_js_1 = require("../../helpers/verifyUserRoles.js");
const { roleStreamerGoTeam, channelSolicitacaoAgendamentosStaff, channelMarcarTwitch, channelsSolicitacaoAgendamentosStaff } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('solicitaragendamento')
        .setDescription('Solicita um agendamento!')
        .addIntegerOption((option) => option
        .setName('horario')
        .setDescription('Qual horário você deseja fazer a live?')
        .setChoices({ name: '10:00', value: 10 }, { name: '12:00', value: 12 }, { name: '14:00', value: 14 }, { name: '16:00', value: 16 }, { name: '18:00', value: 18 }, { name: '20:00', value: 20 }, { name: '22:00', value: 22 })
        .setRequired(true))
        .addStringOption((option) => option
        .setName('dia')
        .setDescription('Qual dia da semana você deseja agendar?')
        .setChoices({ name: 'Domingo', value: 'Domingo' }, { name: 'Segunda', value: 'Segunda-Feira' }, { name: 'Terça', value: 'Terça-Feira' }, { name: 'Quarta', value: 'Quarta-Feira' }, { name: 'Quinta', value: 'Quinta-Feira' }, { name: 'Sexta', value: 'Sexta-Feira' }, { name: 'Sábado', value: 'Sábado' })
        .setRequired(true))
        .addStringOption((option) => option
        .setName('preenchimento')
        .setDescription('MARCAR SIM APENAS COM AUTORIZAÇÃO DA STAFF!')
        .setChoices({ name: 'SIM', value: 'sim' })),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const streamer = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(streamer, roleStreamerGoTeam))) {
                interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const streamerNickname = streamer.displayName;
            if (!streamerNickname.toLowerCase().includes('twitch.tv/')) {
                interaction.editReply({
                    content: 'Seu nome não está no padrão twitch.tv/NickTwitch, solicite a alguém da STAFF para alterar antes de agendar!'
                });
                return;
            }
            let streamerAvatar = streamer.user.avatarURL();
            if (!streamerAvatar) {
                streamerAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png';
            }
            const streamerTwitch = streamerNickname.split('/')[1];
            const dia = interaction.options.getString('dia');
            const horario = interaction.options.getInteger('horario');
            const horarioString = horario + ':00';
            const preenchimento = interaction.options.getString('preenchimento');
            const horaSolicitacao = new Date().getHours();
            const horarioCorreto = horaSolicitacao < 12 || horaSolicitacao > 21;
            if (preenchimento != 'sim' && horarioCorreto) {
                yield interaction.editReply({
                    content: 'O horário de agendamento é das 12:00 às 21:00 (Horário de Brasilia) ou 15:00 às 00:00 (Horário de Lisboa), caso a STAFF tenha solicitado, marcar a opção SIM em preenchimento'
                });
                return;
            }
            /*const situacaoAgendamento = verificaDias(dia);
            if(!situacaoAgendamento.liberarAgendamento){
                await interaction.editReply({
                    content: 'Os agendamentos são para o dia seguinte (ou para hoje caso seja um preenchimento), por favor, faça o agendamento selecionando o dia da semana correto!'
                });
                return;
            }*/
            const embedUser = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setTitle(streamerNickname)
                .setAuthor({ name: 'Solicitação de Agendamento', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setThumbnail(streamerAvatar)
                .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Dia', value: dia, inline: true }, { name: 'Horário', value: horarioString, inline: true });
            const horarioTag = `agendamentos${horario}`;
            const channelStaff = yield client.channels.fetch(channelsSolicitacaoAgendamentosStaff[horarioTag]);
            const channelMarcarTwitchFetch = yield client.channels.fetch(channelMarcarTwitch);
            const messageUser = yield channelMarcarTwitchFetch.send({
                embeds: [embedUser]
            });
            const messageId = messageUser.id;
            const presenca1Dia = yield (0, verificaMediaPresenca_js_1.default)(1, streamerTwitch);
            const presenca3Dias = yield (0, verificaMediaPresenca_js_1.default)(3, streamerTwitch);
            const presenca7Dias = yield (0, verificaMediaPresenca_js_1.default)(7, streamerTwitch);
            const presenca14Dias = yield (0, verificaMediaPresenca_js_1.default)(14, streamerTwitch);
            const livesRecentes = yield (0, verificaLivesRecentes_js_1.default)(6, streamerNickname);
            const buttonAprovar = new discord_js_1.ButtonBuilder()
                .setCustomId('solicitacao-aprovada')
                .setEmoji('✅')
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const buttonCancelar = new discord_js_1.ButtonBuilder()
                .setCustomId('solicitacao-cancelada')
                .setEmoji('🏳️')
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const buttonReprovarPresenca = new discord_js_1.ButtonBuilder()
                .setCustomId('solicitacao-reprovada-presenca')
                .setEmoji('🚫')
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const buttonReprovarAdvertencia = new discord_js_1.ButtonBuilder()
                .setCustomId('solicitacao-reprovada-advertencia')
                .setEmoji('⚠️')
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const buttonReprovarPrioridade = new discord_js_1.ButtonBuilder()
                .setCustomId('solicitacao-reprovada-prioridade')
                .setEmoji('⛔')
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const embedStaff = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setTitle(streamerNickname)
                .setAuthor({ name: 'Solicitação de Agendamento', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setThumbnail(streamerAvatar)
                .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Dia', value: dia, inline: true }, { name: 'Horário', value: horarioString, inline: true }, { name: '\u200B', value: '\u200B' }, { name: '\u200B', value: `<@${streamer.id}>` }, { name: '\u200B', value: '\u200B' }, { name: 'Média de Presença 1 Dia', value: presenca1Dia.mediaPresenca }, { name: '\u200B', value: '\u200B' }, { name: 'Média de Presença 3 Dias', value: presenca3Dias.mediaPresenca }, { name: '\u200B', value: '\u200B' }, { name: 'Média de Presença 7 Dias', value: presenca7Dias.mediaPresenca }, { name: '\u200B', value: '\u200B' }, { name: 'Média de Presença 14 Dias', value: presenca14Dias.mediaPresenca }, { name: '\u200B', value: '\u200B' }, { name: 'Lives Realizadas nos últimos 7 Dias:', value: `${livesRecentes.numeroLives}` }, { name: '\u200B', value: '\u200B' }, { name: 'Datas das Lives:', value: `- ${livesRecentes.datasLives} -` }, { name: '\u200B', value: '\u200B' })
                .setFooter({ text: streamer.id + '/' + messageId, iconURL: streamerAvatar });
            yield channelStaff.send({
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents([buttonReprovarPresenca, buttonReprovarAdvertencia, buttonReprovarPrioridade, buttonCancelar]),
                    new discord_js_1.ActionRowBuilder().addComponents([buttonAprovar])
                ],
                embeds: [embedStaff]
            });
            const embedRetorno = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setTitle('Sua solicitação foi criada com sucesso!')
                .setAuthor({ name: 'Go Team Streamers', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setDescription(`${streamerTwitch} o seu agendamento para ${dia} às ${horario}:00(BR) foi enviado para análise, após as 21:00(BR)/00:00(PT) você receberá aqui o retorno do seu agendamento!`);
            let messageContent = 'Solicitação de agendamento criada com sucesso!';
            yield streamer.send({
                embeds: [embedRetorno]
            }).catch(error => {
                messageContent = messageContent + '\nFavor ir nas configurações de privacidade do servidor e habilitar "Mensagens diretas" para o bot conseguir mandar as notificações para você! (Não se preocupe, não fazemos SPAM)';
            });
            yield interaction.editReply({
                content: messageContent
            }).catch(error => {
                console.log(error);
            });
        });
    }
};

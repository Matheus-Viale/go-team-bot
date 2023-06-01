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
const verifyUserRoles_js_1 = require("../../helpers/verifyUserRoles.js");
const agendamento_js_1 = require("../../schemas/agendamento.js");
const { roleResponsavelTwitch, channelLiveTwitch } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('staffconsultaragenda')
        .setDescription('Mostra a agenda completa! [STAFF]')
        .addIntegerOption((option) => option
        .setName('dia')
        .setDescription('Consultar a agenda de qual dia?')
        .setChoices({ name: 'Hoje', value: 0 }, { name: 'Amanhã', value: 1 })
        .setRequired(true))
        .addStringOption((option) => option
        .setName('tipo')
        .setDescription('Qual o modo de exibição da agenda? (Simples para consulta da staff, Completo para informar usuários)')
        .setChoices({ name: 'Simples', value: 'simples' }, { name: 'Completo', value: 'completo' })
        .setRequired(true)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                yield interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const tipo = interaction.options.getString('tipo');
            const dia = interaction.options.getInteger('dia');
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + dia);
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
            let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
            if (!agendamentoCriado) {
                yield interaction.editReply({
                    content: `Não existe agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`
                });
                return;
            }
            if (tipo === 'simples') {
                interaction.editReply({
                    content: `AGENDA DA DATA: ${agendamentoCriado.diaAgendamento}
                    STREAMER DAS 10:00 > ${agendamentoCriado.streamerAgendado10}
                    STREAMER DAS 12:00 > ${agendamentoCriado.streamerAgendado12}
                    STREAMER DAS 14:00 > ${agendamentoCriado.streamerAgendado14}
                    STREAMER DAS 16:00 > ${agendamentoCriado.streamerAgendado16}
                    STREAMER DAS 18:00 > ${agendamentoCriado.streamerAgendado18}
                    STREAMER DAS 20:00 > ${agendamentoCriado.streamerAgendado20}
                    STREAMER DAS 22:00 > ${agendamentoCriado.streamerAgendado22}`
                });
                return;
            }
            const fieldsEmbed = [{ name: '\u200B', value: '\u200B' },];
            for (let i = 10; i <= 22; i += 2) {
                const horarioTag = ('streamerAgendado' + i);
                if (agendamentoCriado[horarioTag] == 'nenhum' && i != 22) {
                    fieldsEmbed.push({ name: `:alarm_clock: ${i}:00 às ${i + 2}:00 :alarm_clock:`, value: `SEM AGENDAMENTO PARA ESTE HORÁRIO` }, { name: '\u200B', value: '\u200B' });
                    continue;
                }
                else if (agendamentoCriado[horarioTag] == 'nenhum' && i == 22) {
                    fieldsEmbed.push({ name: `:alarm_clock: ${i}:00 às 00:00 :alarm_clock:`, value: `SEM AGENDAMENTO PARA ESTE HORÁRIO` });
                    continue;
                }
                if (i != 22) {
                    fieldsEmbed.push({ name: `:alarm_clock: ${i}:00 às ${i + 2}:00 :alarm_clock:`, value: `https://www.twitch.tv/${agendamentoCriado[horarioTag].split('/')[1]}` }, { name: '\u200B', value: '\u200B' });
                    continue;
                }
                if (i == 22) {
                    fieldsEmbed.push({ name: `:alarm_clock: ${i}:00 às 00:00 :alarm_clock:`, value: `https://www.twitch.tv/${agendamentoCriado[horarioTag].split('/')[1]}` });
                    continue;
                }
            }
            if (tipo === 'completo') {
                const embed = new discord_js_1.EmbedBuilder()
                    .setTitle(`Agenda do dia ${agendamentoCriado.diaAgendamento}`)
                    .setColor(0x6441A5)
                    .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                    .addFields(fieldsEmbed);
                const channel = yield client.channels.fetch(channelLiveTwitch);
                yield channel.send({
                    embeds: [embed]
                });
                yield interaction.editReply({
                    content: `AGENDA DA DATA: ${agendamentoCriado.diaAgendamento}
                    STREAMER DAS 10:00 > ${agendamentoCriado.streamerAgendado10}
                    STREAMER DAS 12:00 > ${agendamentoCriado.streamerAgendado12}
                    STREAMER DAS 14:00 > ${agendamentoCriado.streamerAgendado14}
                    STREAMER DAS 16:00 > ${agendamentoCriado.streamerAgendado16}
                    STREAMER DAS 18:00 > ${agendamentoCriado.streamerAgendado18}
                    STREAMER DAS 20:00 > ${agendamentoCriado.streamerAgendado20}
                    STREAMER DAS 22:00 > ${agendamentoCriado.streamerAgendado22}`
                });
                return;
            }
        });
    }
};

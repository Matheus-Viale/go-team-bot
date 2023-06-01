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
const mongoose = require("mongoose");
const agendaMensagemStreamer_js_1 = require("../../helpers/schedule/agendaMensagemStreamer.js");
const agendaVerificadorPresenca_js_1 = require("../../helpers/schedule/agendaVerificadorPresenca.js");
const { roleResponsavelTwitch, channelAgendamentoStaff } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('agendamentocompleto')
        .setDescription('Cria e monta a agenda completa! [STAFF]')
        .addIntegerOption((option) => option
        .setName('dia')
        .setDescription('O agendamento é para hoje ou amanhã?')
        .setChoices({ name: 'Hoje', value: 0 }, { name: 'Amanhã', value: 1 })
        .setRequired(true))
        .addUserOption((option) => option
        .setName('streamer10')
        .setDescription('Qual Streamer irá fazer a live às 10:00?'))
        .addUserOption((option) => option
        .setName('streamer12')
        .setDescription('Qual Streamer irá fazer a live às 12:00?'))
        .addUserOption((option) => option
        .setName('streamer14')
        .setDescription('Qual Streamer irá fazer a live às 14:00?'))
        .addUserOption((option) => option
        .setName('streamer16')
        .setDescription('Qual Streamer irá fazer a live às 16:00?'))
        .addUserOption((option) => option
        .setName('streamer18')
        .setDescription('Qual Streamer irá fazer a live às 18:00?'))
        .addUserOption((option) => option
        .setName('streamer20')
        .setDescription('Qual Streamer irá fazer a live às 20:00?'))
        .addUserOption((option) => option
        .setName('streamer22')
        .setDescription('Qual Streamer irá fazer a live às 22:00?')),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const { guild } = interaction;
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                yield interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const channelAgendamentoStaffFetch = yield guild.channels.fetch(channelAgendamentoStaff);
            const dia = interaction.options.getInteger('dia');
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + dia);
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
            let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
            if (agendamentoCriado) {
                yield interaction.editReply({
                    content: `Já existe um agendamento criado para o dia ${dataStringAgendamento}, favor utilizar os comandos /agendamentosimples, /alteraragendamento e /removeragendamento`
                });
                return;
            }
            const streamersAgendados = [];
            const streamersErro = [];
            for (let i = 10; i <= 22; i += 2) {
                const streamer = interaction.options.getMember('streamer' + i);
                if (streamer == null) {
                    streamersAgendados.push('nenhum');
                    continue;
                }
                const streamerNickname = streamer.displayName;
                if (!streamerNickname.toLowerCase().includes('twitch.tv/')) {
                    streamersErro.push(streamerNickname);
                    continue;
                }
                const streamerId = streamer.id;
                const streamerTwitch = streamerNickname.split('/')[1];
                streamersAgendados.push(streamerNickname);
                const diaAgendamento = dataAgendamento.getDate();
                const horaAgendamento = i;
                yield (0, agendaVerificadorPresenca_js_1.default)(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, client);
                yield (0, agendaMensagemStreamer_js_1.default)(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
            }
            if (streamersErro.length > 0) {
                const streamersErroString = streamersErro.join(', ');
                yield interaction.editReply({
                    content: `O(s) nome(s) ${streamersErroString} não estão no padrão twitch.tv/NickTwitch, alterar antes de agendar!`
                });
                return;
            }
            agendamentoCriado = new agendamento_js_1.default({
                _id: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
                diaAgendamento: dataStringAgendamento,
                streamerAgendado10: streamersAgendados[0],
                streamerAgendado12: streamersAgendados[1],
                streamerAgendado14: streamersAgendados[2],
                streamerAgendado16: streamersAgendados[3],
                streamerAgendado18: streamersAgendados[4],
                streamerAgendado20: streamersAgendados[5],
                streamerAgendado22: streamersAgendados[6]
            });
            yield agendamentoCriado.save().then((novoAgendamento) => __awaiter(this, void 0, void 0, function* () {
                channelAgendamentoStaffFetch.send({
                    content: `${member.displayName} realizou o agendamento completo para: ${novoAgendamento.diaAgendamento}\nPara ver a agenda use **/staffconsultaragenda**`
                });
                yield interaction.editReply({
                    content: `Agendamento para a data ${novoAgendamento.diaAgendamento} foi criado com sucesso!`
                });
            }));
        });
    }
};

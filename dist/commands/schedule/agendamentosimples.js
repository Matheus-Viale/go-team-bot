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
const agendaVerificadorPresenca_js_1 = require("../../helpers/schedule/agendaVerificadorPresenca.js");
const agendaMensagemStreamer_js_1 = require("../../helpers/schedule/agendaMensagemStreamer.js");
const { roleResponsavelTwitch, channelAgendamentoStaff } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('agendamentosimples')
        .setDescription('Agenda um streamer para um horário pré definido! [STAFF]')
        .addUserOption((option) => option
        .setName('streamer')
        .setDescription('Qual Streamer irá fazer a live?')
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('horario')
        .setDescription('Qual o horário o Streamer será agendado?')
        .setChoices({ name: '10:00', value: 10 }, { name: '12:00', value: 12 }, { name: '14:00', value: 14 }, { name: '16:00', value: 16 }, { name: '18:00', value: 18 }, { name: '20:00', value: 20 }, { name: '22:00', value: 22 })
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('dia')
        .setDescription('O agendamento é para hoje ou amanhã?')
        .setChoices({ name: 'Hoje', value: 0 }, { name: 'Amanhã', value: 1 })
        .setRequired(true)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const { guild } = interaction;
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const channelAgendamentoStaffFetch = yield guild.channels.fetch(channelAgendamentoStaff);
            const streamer = interaction.options.getMember('streamer');
            const streamerId = streamer.id;
            const streamerNickname = streamer.displayName;
            if (!streamerNickname.toLowerCase().includes('twitch.tv/')) {
                interaction.editReply({
                    content: 'Nome do streamer não está no padrão twitch.tv/NickTwitch, alterar antes de agendar!'
                });
                return;
            }
            const streamerTwitch = streamerNickname.split('/')[1];
            const horario = interaction.options.getInteger('horario');
            const horarioTag = 'streamerAgendado' + horario;
            const dia = interaction.options.getInteger('dia');
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + dia);
            const diaAgendamento = dataAgendamento.getDate();
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
            let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
            if (!agendamentoCriado) {
                interaction.editReply({
                    content: `Não existe tabela de agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`
                });
                return;
            }
            if (agendamentoCriado[horarioTag] != 'nenhum') {
                interaction.editReply({
                    content: `O streamer ${agendamentoCriado[horarioTag]} já está agendado para o horário das ${horario}:00, se deseja substituir usar o comando /alteraragendamento`
                });
                return;
            }
            agendamentoCriado[horarioTag] = streamerNickname;
            yield agendamentoCriado.save().then((novoAgendamento) => __awaiter(this, void 0, void 0, function* () {
                yield (0, agendaVerificadorPresenca_js_1.default)(dataAgendamento, diaAgendamento, horario, streamerTwitch, client);
                yield (0, agendaMensagemStreamer_js_1.default)(dataAgendamento, diaAgendamento, horario, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
                channelAgendamentoStaffFetch.send({
                    content: `Agenda da data ${novoAgendamento.diaAgendamento} foi atualizada por ${member.displayName} com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
                });
                interaction.editReply({
                    content: `Agenda da data ${novoAgendamento.diaAgendamento} atualizada com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
                });
            }));
        });
    }
};

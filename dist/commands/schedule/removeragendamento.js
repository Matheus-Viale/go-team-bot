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
const removeAgendaVerificadorPresenca_js_1 = require("../../helpers/schedule/removeAgendaVerificadorPresenca.js");
const removeAgendaMensagemStreamer_js_1 = require("../../helpers/schedule/removeAgendaMensagemStreamer.js");
const { roleResponsavelTwitch, channelAgendamentoStaff } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('removeragendamento')
        .setDescription('Remove um agendamento! [STAFF]')
        .addIntegerOption((option) => option
        .setName('horario')
        .setDescription('Qual horário será removido?')
        .setChoices({ name: '10:00', value: 10 }, { name: '12:00', value: 12 }, { name: '14:00', value: 14 }, { name: '16:00', value: 16 }, { name: '18:00', value: 18 }, { name: '20:00', value: 20 }, { name: '22:00', value: 22 })
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('dia')
        .setDescription('O agendamento a ser removido é hoje ou amanhã?')
        .setChoices({ name: 'Hoje', value: 0 }, { name: 'Amanhã', value: 1 })
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
            const { guild } = interaction;
            const channelAgendamentoStaffFetch = yield guild.channels.fetch(channelAgendamentoStaff);
            const horario = interaction.options.getInteger('horario');
            const horarioTag = ('streamerAgendado' + horario);
            const dia = interaction.options.getInteger('dia');
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + dia);
            const diaAgendamento = dataAgendamento.getDate();
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
            let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
            if (!agendamentoCriado) {
                yield interaction.editReply({
                    content: `Não existe agendamento criado para o dia ${dataStringAgendamento}`
                });
                return;
            }
            if (agendamentoCriado[horarioTag] == 'nenhum') {
                yield interaction.editReply({
                    content: `Não há nenhum streamer agendado para o dia ${agendamentoCriado.diaAgendamento} no horário das ${horario}:00`
                });
                return;
            }
            agendamentoCriado[horarioTag] = 'nenhum';
            yield agendamentoCriado.save().then((novoAgendamento) => __awaiter(this, void 0, void 0, function* () {
                yield (0, removeAgendaVerificadorPresenca_js_1.default)(diaAgendamento, horario);
                yield (0, removeAgendaMensagemStreamer_js_1.default)(diaAgendamento, horario);
                channelAgendamentoStaffFetch.send({
                    content: `Agendamento da data ${novoAgendamento.diaAgendamento} no horário das ${horario} foi removido por ${member.displayName}!`
                });
                yield interaction.editReply({
                    content: `Agendamento da data ${novoAgendamento.diaAgendamento} no horário das ${horario} foi removido!`
                });
            }));
        });
    }
};

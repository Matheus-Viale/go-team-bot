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
const verificaHorariosVagos_js_1 = require("../../helpers/attendance/verificaHorariosVagos.js");
const verifyUserRoles_js_1 = require("../../helpers/verifyUserRoles.js");
const alteraStatusPreenchimento_js_1 = require("../../helpers/alteraStatusPreenchimento.js");
const { roleResponsavelTwitch, channelMarcarTwitch, roleStreamerGoTeam } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('notificarvagas')
        .setDescription('Notificas os Streamers sobre os horários em aberto!')
        .addIntegerOption((option) => option
        .setName('dia')
        .setDescription('A(s) vaga(s) é(são) para hoje ou amanhã?')
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
            let diaString = 'HOJE';
            const dia = interaction.options.getInteger('dia');
            const dataHoje = new Date();
            dataHoje.setDate(dataHoje.getDate() + dia);
            const dataString = dataHoje.toLocaleDateString('pt-BR');
            if (dia == 1)
                diaString = 'AMANHÃ';
            const horarios = yield (0, verificaHorariosVagos_js_1.default)(dataString);
            if (horarios.status == 'SEM AGENDAMENTO') {
                yield interaction.editReply({
                    content: `Não existe agendamento criado para a data ${dataString}`
                });
                return;
            }
            if (horarios.status == 'SEM VAGAS') {
                yield interaction.editReply({
                    content: `Não existe vagas na data ${dataString}`
                });
                return;
            }
            const fieldsEmbed = [{ name: '\u200B', value: '\u200B' },];
            for (const horario of horarios.horariosVagos) {
                fieldsEmbed.push({ name: `:alarm_clock: ${horario}:00 às ${horario + 2}:00 :alarm_clock:`, value: `\u200B` });
            }
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(`Como solicitar?`)
                .setDescription(`\n**Preenchimento?**\nCaso tenha passado do horário de solicitações e a STAFF informou que existem horários disponíves, basta usar a opção preenchimento SIM e poderá fazer a solicitação fora de horário\n\n**AVISO!**\nO uso da opção de preenchimento sem autorização da STAFF resultará em advertência!`)
                .setColor(0x6441A5)
                .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                .addFields(fieldsEmbed);
            const channel = yield client.channels.fetch(channelMarcarTwitch);
            yield channel.send({
                embeds: [embed],
                content: `<@&${roleStreamerGoTeam}>\nHORÁRIOS DISPONIVEIS ${diaString}`
            });
            const retorno = yield (0, alteraStatusPreenchimento_js_1.default)('ativado');
            let messagemPreenchimento;
            if (retorno == 'ALTERADO') {
                messagemPreenchimento = 'e o preenchimento foi ativado!';
            }
            if (retorno == 'IGUAL') {
                messagemPreenchimento = 'e o preenchimento já estava ativado!';
            }
            if (retorno == 'ERROR') {
                messagemPreenchimento = 'e houve um erro em alterar o preenchimento, favor tente manualmente!';
            }
            yield interaction.editReply({
                content: `Notificação enviada no canal <#${channelMarcarTwitch}> ` + messagemPreenchimento
            });
        });
    }
};

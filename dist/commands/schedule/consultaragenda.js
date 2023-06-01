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
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('consultaragenda')
        .setDescription('Mostra a agenda do dia!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleStreamerGoTeam))) {
                yield interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const dataAgendamento = new Date();
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
            let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
            if (!agendamentoCriado) {
                yield interaction.editReply({
                    content: `A agenda do dia ${dataStringAgendamento} ainda não foi montada!`
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
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(`Agenda do dia ${agendamentoCriado.diaAgendamento}`)
                .setColor(0x6441A5)
                .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                .addFields(fieldsEmbed);
            yield interaction.editReply({
                embeds: [embed]
            });
        });
    }
};

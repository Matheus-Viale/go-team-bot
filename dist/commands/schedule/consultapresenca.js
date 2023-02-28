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
const verificaMediaPresenca_js_1 = require("../../helpers/attendance/verificaMediaPresenca.js");
const verifyUserRoles_js_1 = require("../../helpers/verifyUserRoles.js");
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('consultapresenca')
        .setDescription('Retorna as informações sobre sua presença nas lives!')
        .addIntegerOption((option) => option
        .setName('periodo')
        .setDescription('Consultar a sua presença em qual período?')
        .setChoices({ name: 'Um Dia', value: 1 }, { name: 'Três Dias', value: 3 }, { name: 'Uma Semana', value: 7 }, { name: 'Duas Semanas', value: 14 })
        .setRequired(true)),
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
                    content: 'Seu nome não está no padrão twitch.tv/NickTwitch, solicite a alguém da STAFF para alterar antes de consultar!'
                });
                return;
            }
            const streamerTwitch = streamerNickname.split('/')[1];
            const periodo = interaction.options.getInteger('periodo');
            const presencaInfo = yield (0, verificaMediaPresenca_js_1.default)(periodo, streamerTwitch);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setTitle(`SUA PRESENÇA NOS ÚLTIMOS ${periodo} DIAS`)
                .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Sua média', value: `Você esteve presente em ${presencaInfo.mediaPresenca} das verificações de lives!` }, { name: '\u200B', value: '\u200B' }, { name: 'Total de Lives', value: `Nos últimos ${periodo} dias houveram ${presencaInfo.totalLives} verificações de lives!` }, { name: '\u200B', value: `\u200B` }, { name: 'Sua Presença', value: `Você estava presente em ${presencaInfo.presenca} verificações de lives!` }, { name: '\u200B', value: `\u200B` }, { name: 'Justificativa?', value: `Caso você tenha se ausentado por algum motivo importante, deixe sua justificativa através do comando "/justificativafalta" e iremos considerar na hora das suas solicitações` });
            streamer.send({
                embeds: [embed]
            }).then(result => {
                interaction.editReply({
                    content: 'Suas informações de presença estão na sua DM'
                });
            }).catch(error => {
                interaction.editReply({
                    embeds: [embed]
                });
            });
        });
    }
};

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
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('staffconsultapresenca')
        .setDescription('Retorna as informações sobre presença nas lives! [STAFF]')
        .addIntegerOption((option) => option
        .setName('periodo')
        .setDescription('Consultar a presença em qual período?')
        .setChoices({ name: 'Um Dia', value: 1 }, { name: 'Três Dias', value: 3 }, { name: 'Uma Semana', value: 7 }, { name: 'Duas Semanas', value: 14 })
        .setRequired(true))
        .addUserOption((option) => option
        .setName('streamer')
        .setDescription('Qual Streamer você deseja consultar a presença?')
        .setRequired(true)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const streamer = interaction.options.getUser('streamer');
            const streamerId = streamer.id;
            const { guild } = interaction;
            const streamerMember = yield guild.members.fetch(streamerId);
            const streamerNickname = streamerMember.displayName;
            if (!streamerNickname.toLowerCase().includes('twitch.tv/')) {
                interaction.editReply({
                    content: `O nome ${streamerNickname} não está no padrão twitch.tv/NickTwitch, altere antes de consultar!`
                });
                return;
            }
            const streamerTwitch = streamerNickname.split('/')[1];
            const periodo = yield interaction.options.getInteger('periodo');
            const presencaInfo = yield (0, verificaMediaPresenca_js_1.default)(periodo, streamerTwitch);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x6441A5)
                .setTitle(`PRESENÇA DE <@${streamerId}> NOS ÚLTIMOS ${periodo} DIAS`)
                .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png' })
                .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                .addFields({ name: '\u200B', value: '\u200B' }, { name: 'Média', value: `${streamerTwitch} esteve presente em ${presencaInfo.mediaPresenca} das verificações de das lives!` }, { name: '\u200B', value: '\u200B' }, { name: 'Total de Lives', value: `Nos últimos ${periodo} dias houveram ${presencaInfo.totalLives} verificações de lives!` }, { name: '\u200B', value: `\u200B` }, { name: 'Presença', value: `${streamerTwitch} estava presente em ${presencaInfo.presenca} verificações de lives!` });
            interaction.editReply({
                embeds: [embed]
            });
        });
    }
};

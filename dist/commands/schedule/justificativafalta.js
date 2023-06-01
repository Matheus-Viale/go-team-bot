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
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('justificativafalta')
        .setDescription('Use para avisar quando não puder acompanhar as lives!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            yield interaction.deferReply({ ephemeral: true });
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleStreamerGoTeam))) {
                yield interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const modal = new discord_js_1.ModalBuilder()
                .setCustomId('justificativa-falta')
                .setTitle('Justificativa de Faltas');
            const textInput = new discord_js_1.TextInputBuilder()
                .setCustomId('justificativaFaltaInput')
                .setLabel('Justifique sua ausência abaixo:')
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Paragraph);
            modal.addComponents(new discord_js_1.ActionRowBuilder().addComponents(textInput));
            yield interaction.showModal(modal);
        });
    }
};

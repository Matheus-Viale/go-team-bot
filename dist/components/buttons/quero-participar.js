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
const { roleStreamerGoTeam, roleOpenTicket } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'quero-participar'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            if (yield (0, verifyUserRoles_js_1.default)(member, roleStreamerGoTeam)) {
                yield interaction.reply({
                    content: 'Você já faz parte do grupo da Go Team!',
                    ephemeral: true
                });
                return;
            }
            if (yield (0, verifyUserRoles_js_1.default)(member, roleOpenTicket)) {
                yield interaction.reply({
                    content: `Você já possui um ticket em aberto`,
                    ephemeral: true
                });
                return;
            }
            const modal = new discord_js_1.ModalBuilder()
                .setCustomId('ticket-recrutamento')
                .setTitle('Recrutamento');
            ;
            const textInput = [];
            textInput.push(new discord_js_1.TextInputBuilder()
                .setCustomId('nomeTwitch')
                .setLabel('Qual a sua twitch? (Apenas o nome)')
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setPlaceholder('Nome do Canal'));
            textInput.push(new discord_js_1.TextInputBuilder()
                .setCustomId('afiliadoTwitch')
                .setLabel('Já é um afiliado da Twitch?')
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setPlaceholder('Sim ou Não'));
            textInput.push(new discord_js_1.TextInputBuilder()
                .setCustomId('tempoLive')
                .setLabel('Há quanto tempo você faz live?')
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Short));
            textInput.push(new discord_js_1.TextInputBuilder()
                .setCustomId('objetivo')
                .setLabel('Qual o seu objetivo com o grupo e na twitch?')
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Paragraph));
            textInput.push(new discord_js_1.TextInputBuilder()
                .setCustomId('recomendacao')
                .setLabel('Como você conheceu a comunidade Go Team?')
                .setRequired(true)
                .setStyle(discord_js_1.TextInputStyle.Short));
            modal.addComponents([
                new discord_js_1.ActionRowBuilder().addComponents(textInput[0]),
                new discord_js_1.ActionRowBuilder().addComponents(textInput[1]),
                new discord_js_1.ActionRowBuilder().addComponents(textInput[2]),
                new discord_js_1.ActionRowBuilder().addComponents(textInput[3]),
                new discord_js_1.ActionRowBuilder().addComponents(textInput[4]),
            ]);
            yield interaction.showModal(modal);
        });
    }
};

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
        .setName('say')
        .setDescription('Use para enviar mensagens, embeds ou botões (Abre um modal para escrever)!')
        .addStringOption((option) => option
        .setName('tipo')
        .setDescription('Qual tipo de mensagem você vai enviar?')
        .setChoices({ name: 'Texto', value: 'texto' }, { name: 'Embed', value: 'embed' }, { name: 'Botão', value: 'button' })
        .setRequired(true)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleStreamerGoTeam))) {
                interaction.reply({
                    content: 'Você não tem permissão para usar este comando!',
                    ephemeral: true
                });
                return;
            }
            const tipo = interaction.options.getString('tipo');
            let modal;
            let textInput;
            if (tipo == 'texto') {
                modal = new discord_js_1.ModalBuilder()
                    .setCustomId('say-modal')
                    .setTitle('O que o bot vai dizer?');
                textInput = new discord_js_1.TextInputBuilder()
                    .setCustomId('sayInput')
                    .setLabel('Escreva o que o bot irá dizer:')
                    .setRequired(true)
                    .setStyle(discord_js_1.TextInputStyle.Paragraph);
            }
            if (tipo == 'embed') {
                modal = new discord_js_1.ModalBuilder()
                    .setCustomId('say-embed-modal')
                    .setTitle('O que o bot vai dizer?');
                textInput = new discord_js_1.TextInputBuilder()
                    .setCustomId('sayEmbedInput')
                    .setLabel('Escreva o construtor de modal:')
                    .setRequired(true)
                    .setStyle(discord_js_1.TextInputStyle.Paragraph);
            }
            if (tipo == 'button') {
                modal = new discord_js_1.ModalBuilder()
                    .setCustomId('say-button-modal')
                    .setTitle('O que o bot vai dizer?');
                textInput = new discord_js_1.TextInputBuilder()
                    .setCustomId('sayButtonInput')
                    .setLabel('Escreva o construtor de botão:')
                    .setRequired(true)
                    .setStyle(discord_js_1.TextInputStyle.Paragraph);
            }
            modal.addComponents(new discord_js_1.ActionRowBuilder().addComponents(textInput));
            yield interaction.showModal(modal);
        });
    }
};

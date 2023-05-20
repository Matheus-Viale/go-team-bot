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
const verificadorPresenca_js_1 = require("../../helpers/attendance/verificadorPresenca.js");
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('testepresenca')
        .setDescription('Retorna meu ping!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                interaction.reply({
                    content: 'Você não tem permissão para usar este comando!',
                    ephemeral: true
                });
                return;
            }
            const teste = yield (0, verificadorPresenca_js_1.default)('horadrage');
            console.log(teste);
            const message = yield interaction.deferReply({
                fetchReply: true,
                ephemeral: true
            });
            const newMessage = `Atraso da API: ${client.ws.ping}ms\nPing do Usuário: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
            yield interaction.editReply({
                content: newMessage
            });
        });
    }
};

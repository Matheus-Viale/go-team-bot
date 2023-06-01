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
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
const alteraStatusPreenchimento_1 = require("../../helpers/alteraStatusPreenchimento");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('configpreenchimento')
        .setDescription('Configura o preenchimento para ativado ou desativado!')
        .addStringOption((option) => option
        .setName('status')
        .setDescription('Qual status você gostaria no preenchimento?')
        .setChoices({ name: 'Ativado', value: 'ativado' }, { name: 'Desativado', value: 'desativado' })
        .setRequired(true)),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({
                ephemeral: true
            });
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                yield interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                });
                return;
            }
            const status = interaction.options.getString('status');
            const retorno = yield (0, alteraStatusPreenchimento_1.default)(status);
            if (retorno == 'IGUAL') {
                yield interaction.editReply({
                    content: `O preenchimento já se encontra com o status (${status})`
                });
                return;
            }
            if (retorno == 'ALTERADO') {
                yield interaction.editReply({
                    content: `O preenchimento foi alterado para o status (${status})`
                });
                return;
            }
            if (retorno == 'ERROR') {
                yield interaction.editReply({
                    content: `Houve um erro na troca do status do preenchimento, por favor tente novamente, se persistir entre em contato com o suporte!`
                });
                return;
            }
        });
    }
};

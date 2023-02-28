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
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
const clearChannel_js_1 = require("../../helpers/clearChannel.js");
const verifyUserRoles_js_1 = require("../../helpers/verifyUserRoles.js");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('clearchannel')
        .setDescription('Limpa a sala de texto atual!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const { channel, member } = interaction;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!',
                    //ephemeral: true
                });
                return;
            }
            const channelName = channel.name;
            const channelId = channel.id;
            yield (0, clearChannel_js_1.default)(client, channelId);
            try {
                yield interaction.editReply({
                    content: `${channelName} foi limpo com sucesso!`,
                    //ephemeral: true
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};

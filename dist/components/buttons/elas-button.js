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
const { roleElas, guildId } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'elas-button'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const member = interaction.member;
            if (member.roles.cache.get(roleElas)) {
                yield interaction.editReply({
                    content: `Você já faz parte do grupo Elas`
                });
                return;
            }
            const guild = yield client.guilds.fetch(guildId);
            const role = yield guild.roles.fetch(roleElas);
            const memberNickname = member.displayName;
            try {
                member.roles.add(role).catch(console.error);
                member.setNickname('❤️' + memberNickname).catch(console.error);
            }
            catch (error) {
                console.log(error);
            }
            yield interaction.editReply({
                content: `Bem vinda, agora você tem acesso aos canais exclusivos para mulheres, fique a vontade mas não esqueça das regras!\nSe encontrar qualquer coisa de errado, ou alguém que não deveria esteja no grupo de vocês, basta abrir um ticket que iremos investigar!\nBoa sorte na sua jornada e boas lives!`
            });
        });
    }
};

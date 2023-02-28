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
const { roleStreamerTwitch, channelQueroParticipar, guildId } = require('../../helpers/globalVariables.js');
module.exports = {
    data: {
        name: 'apenas-visitando'
    },
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({ ephemeral: true });
            const guild = yield client.guilds.fetch(guildId);
            const role = yield guild.roles.fetch(roleStreamerTwitch);
            const member = interaction.member;
            member.roles.add(role);
            yield interaction.editReply({
                content: `Olá ${member.displayName}, agora você pode interagir com o pessoal no servidor, fique a vontade mas não esqueça das regras!\n
                Caso mude de ideia e queira participar da agenda, basta ir no canal <#${channelQueroParticipar}> e abrir o seu ticket de recrutamento.\n
                Boa sorte na sua jornada e boas lives!`
            });
        });
    }
};

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
const { channelLogs } = require('../../helpers/globalVariables.js');
module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (oldMember.nickname == newMember.nickname) {
                return;
            }
            const memberId = newMember.id;
            const memberName = newMember.nickname;
            const memberTag = newMember.user.tag;
            const channel = yield client.channels.fetch(channelLogs);
            let oldNickname = oldMember.nickname;
            if (!oldNickname) {
                oldNickname = 'Sem Apelido';
            }
            let memberAvatar = newMember.user.avatarURL();
            if (!memberAvatar) {
                memberAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png';
            }
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x03c03c)
                .setAuthor({ name: memberTag, iconURL: memberAvatar })
                .setTitle(`O usuário ${memberTag} teve seu nickname alterado!`)
                .addFields({ name: 'Antigo:', value: `${oldNickname}` }, { name: 'Novo:', value: `${memberName}` })
                .setFooter({ text: `ID do usuário: ${memberId}` });
            channel.send({
                embeds: [embed]
            });
        });
    }
};

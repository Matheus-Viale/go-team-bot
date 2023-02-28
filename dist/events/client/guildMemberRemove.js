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
const { channelSaidas } = require('../../helpers/globalVariables.js');
module.exports = {
    name: 'guildMemberRemove',
    execute(member, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberId = member.id;
            const memberName = member.displayName;
            const memberTag = member.user.tag;
            let memberAvatar = member.user.avatarURL();
            if (!memberAvatar) {
                memberAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png';
            }
            const channel = yield client.channels.fetch(channelSaidas);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xf44336)
                .setTitle(`${memberName} saiu do servidor!`)
                .setAuthor({ name: `${memberTag}`, iconURL: `${memberAvatar}` })
                .setThumbnail(memberAvatar)
                .setFooter({ text: `ID do usuário: ${memberId}` });
            channel.send({
                embeds: [embed]
            });
        });
    }
};

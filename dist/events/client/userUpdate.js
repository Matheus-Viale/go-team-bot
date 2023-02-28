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
    name: 'userUpdate',
    execute(oldUser, newUser, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = newUser.id;
            const userName = newUser.username;
            const userTag = newUser.tag;
            const userAvatar = newUser.avatarURL();
            const channel = yield client.channels.fetch(channelLogs);
            let oldUserAvatar = oldUser.avatarURL();
            if (!oldUserAvatar) {
                oldUserAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png';
            }
            if (userAvatar == oldUserAvatar) {
                return;
            }
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x03c03c)
                .setAuthor({ name: `${userTag}` })
                .setTitle(`O usuário ${userName} alterou sua imagem de perfil!`)
                .setThumbnail(`${oldUserAvatar}`)
                .addFields({ name: 'Antiga:', value: `Ao lado ⏩` }, { name: 'Nova:', value: 'Abaixo ⏬' })
                .setImage(userAvatar)
                .setFooter({ text: `ID do usuário: ${userId}` });
            channel.send({
                embeds: [embed]
            });
        });
    }
};

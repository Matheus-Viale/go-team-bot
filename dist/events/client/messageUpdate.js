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
    name: 'messageUpdate',
    execute(oldMessage, newMessage, client) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(oldMessage)
            if (oldMessage.author.bot) {
                return;
            }
            if (oldMessage.content === newMessage.content)
                return;
            const channel = yield client.channels.fetch(channelLogs);
            const count = 1950;
            const original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? ' ...' : '');
            const editada = newMessage.content.slice(0, count) + (newMessage.content.length > count ? ' ...' : '');
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0x03c03c)
                .setDescription(`📄 A [MENSAGEM](${newMessage.url}) do <@${newMessage.author.id}> foi **EDITADA** no canal <#${newMessage.channelId}>.\n
                **Original**:\n ${original} \n**Editada**:\n ${editada}`.slice(0, 4096))
                .setFooter({ text: `Membro: ${newMessage.author.tag}   |   ID: ${newMessage.author.id}` });
            channel.send({
                embeds: [embed]
            });
        });
    }
};

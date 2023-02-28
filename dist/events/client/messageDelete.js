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
    name: 'messageDelete',
    execute(message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot) {
                return;
            }
            const count = 1950;
            const mensagem = message.content.slice(0, count) + (message.content.length > count ? ' ...' : '');
            const channel = yield client.channels.fetch(channelLogs);
            const embed = new discord_js_1.EmbedBuilder()
                .setColor(0xf44336)
                .setDescription(`📄 Uma mensagem do <@${message.author.id}> foi **DELETADA** no canal <#${message.channelId}>.\n
                **MENSAGEM**:\n ${mensagem}`.slice(0, 4096))
                .setFooter({ text: `Membro: ${message.author.tag}   |   ID: ${message.author.id}` });
            channel.send({
                embeds: [embed]
            });
        });
    }
};

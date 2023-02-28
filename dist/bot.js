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
require('dotenv').config();
const { BOT_TOKEN, MONGODBURL } = process.env;
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const discord_js_1 = require("discord.js");
const fs = require("fs");
const myIntents = [
    discord_js_1.GatewayIntentBits.Guilds,
    discord_js_1.GatewayIntentBits.GuildMembers,
    discord_js_1.GatewayIntentBits.GuildPresences,
    discord_js_1.GatewayIntentBits.GuildMessages,
    discord_js_1.GatewayIntentBits.MessageContent,
    discord_js_1.GatewayIntentBits.DirectMessages,
    discord_js_1.GatewayIntentBits.GuildModeration,
    discord_js_1.GatewayIntentBits.GuildWebhooks,
    discord_js_1.GatewayIntentBits.AutoModerationConfiguration,
    discord_js_1.GatewayIntentBits.AutoModerationExecution
];
const client = new discord_js_1.Client({ intents: myIntents });
client.commands = new discord_js_1.Collection();
client.buttons = new discord_js_1.Collection();
client.selectMenus = new discord_js_1.Collection();
client.modals = new discord_js_1.Collection();
client.commandArray = [];
const functionFolders = fs.readdirSync(`./dist/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./dist/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}
client.eventsHandler();
client.commandsHandler();
client.componentsHandler();
client.login(BOT_TOKEN);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.connect)(MONGODBURL).catch(console.error);
}))();

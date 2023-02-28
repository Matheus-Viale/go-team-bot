require('dotenv').config();
const { BOT_TOKEN, MONGODBURL } = process.env;
import { connect } from 'mongoose';
import mongoose = require('mongoose');
mongoose.set('strictQuery', false);
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs = require('fs');
const myIntents = [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
]

const client: any = new Client({ intents: myIntents });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./dist/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./dist/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.eventsHandler();
client.commandsHandler();
client.componentsHandler();
client.login(BOT_TOKEN);
(async () =>{
    await connect(MONGODBURL).catch(console.error);
})();
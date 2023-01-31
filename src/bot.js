require('dotenv').config();
const { BOT_TOKEN, MONGODBURL } = process.env;
const { connect } = require('mongoose');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');


const client = new Client({ intents: GatewayIntentBits.Guilds, disableEveryone: false });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client)
}

client.eventsHandler();
client.commandsHandler();
client.componentsHandler();
client.login(BOT_TOKEN);
(async () =>{
    await connect(MONGODBURL).catch(console.error);
})();
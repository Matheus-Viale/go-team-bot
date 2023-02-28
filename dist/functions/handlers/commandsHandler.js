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
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const fs_1 = require("fs");
module.exports = (client) => {
    client.commandsHandler = () => __awaiter(void 0, void 0, void 0, function* () {
        const commandFolders = (0, fs_1.readdirSync)('./dist/commands');
        for (const folder of commandFolders) {
            const commandFiles = (0, fs_1.readdirSync)(`./dist/commands/${folder}`).filter(file => file.endsWith('.js'));
            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }
        const { CLIENT_ID, GUILD_ID, BOT_TOKEN } = process.env;
        const rest = new rest_1.REST({ version: '9' }).setToken(BOT_TOKEN);
        try {
            console.log('Carregando aplicação (/)Comandos sendo carregados...');
            yield rest.put(v9_1.Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                body: client.commandArray,
            });
            console.log('(/)Comandos carregados com sucesso!');
        }
        catch (error) {
            console.error(error);
        }
    });
};

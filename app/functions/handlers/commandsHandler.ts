import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { readdirSync } from 'fs';

module.exports = (client: any) =>{
    client.commandsHandler = async () =>{
        const commandFolders = readdirSync('./dist/commands');
        for (const folder of commandFolders){
            const commandFiles = readdirSync(`./dist/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles){
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const { CLIENT_ID, GUILD_ID, BOT_TOKEN } = process.env;
        const rest = new REST({ version: '9'}).setToken(BOT_TOKEN);
        try {
            console.log('Carregando aplicação (/)Comandos sendo carregados...');

            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),{
                body: client.commandArray,
            });

            console.log('(/)Comandos carregados com sucesso!');
        } catch (error) {
            console.error(error)
        }
    };
}
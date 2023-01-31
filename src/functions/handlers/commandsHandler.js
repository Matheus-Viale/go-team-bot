const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { readdirSync } = require('fs');

module.exports = (client) =>{
    client.commandsHandler = async () =>{
        const commandFolders = readdirSync('./src/commands');
        for (const folder of commandFolders){
            const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles){
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const { CLIENT_ID, GUILD_ID} = process.env;
        const rest = new REST({ version: '9'}).setToken(process.env.BOT_TOKEN);
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
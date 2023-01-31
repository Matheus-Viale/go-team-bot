const { SlashCommandBuilder } = require('discord.js');
const {verificaMediaPresenca} = require('../../helpers/attendance/verificaMediaPresenca.js');




module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna meu ping!'),
    async execute(interaction, client){

        verificaMediaPresenca(7, 'streamelements');
        //PING ORIGINAL
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `Atraso da API: ${client.ws.ping}ms\nPing do Usuário: ${message.createdTimestamp - interaction.createdTimestamp}ms`
        await interaction.editReply({
            content: newMessage
        });

    }
}
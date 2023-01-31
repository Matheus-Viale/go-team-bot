const { SlashCommandBuilder } = require('discord.js');
const { verifyUserRoles } = require('../../helpers/verifyUserRoles.js');
const {roleResponsavelTwitch} = require('../../helpers/globalVariables.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna meu ping!'),
    async execute(interaction, client){
        if(!await verifyUserRoles(interaction.member, roleResponsavelTwitch)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }
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
const { SlashCommandBuilder, ChannelType } = require('discord.js');
const {roleResponsavelTwitch} = require('../../helpers/globalVariables.js');
const {clearChannel} = require('../../helpers/clearChannel.js');
const { verifyUserRoles } = require('../../helpers/verifyUserRoles.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearchannel')
        .setDescription('Limpa a sala de texto atual!')
    ,
    async execute(interaction, client){

        if(!await verifyUserRoles(interaction.member, roleResponsavelTwitch)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }

        const channel = await interaction.channel;
        const channelName = channel.name;
        const channelId = channel.id;

        await clearChannel(client, channelId);

        await interaction.reply({
            content: `${channelName} foi limpo com sucesso!`,
            ephemeral: true
        });

    }
}
import { SlashCommandBuilder, Client, ChatInputCommandInteraction, GuildMember} from 'discord.js';
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
import clearChannel from '../../helpers/clearChannel.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearchannel')
        .setDescription('Limpa a sala de texto atual!')
    ,
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const {channel, member} = interaction;
        
        if(!await verifyUserRoles((member as GuildMember), roleResponsavelTwitch)){
            interaction.editReply({
                content: 'Você não tem permissão para usar este comando!',
                //ephemeral: true
            })
            return;
        }
        const channelName = channel.name;
        const channelId = channel.id;

        await clearChannel(client, channelId);

        try {
            await interaction.editReply({
                content: `${channelName} foi limpo com sucesso!`,
                //ephemeral: true
            });
        } catch (error) {
            console.log(error);
        }
        

    }
}
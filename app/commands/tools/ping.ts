import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import verificaMediaPresenca from '../../helpers/attendance/verificaMediaPresenca.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna meu ping!'),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        const member = (interaction.member as GuildMember)
        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }

        const presencaInfo = await verificaMediaPresenca(3, 'ManoYiHPL');
        console.log(presencaInfo);
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral: true
        });

        const newMessage = `Atraso da API: ${client.ws.ping}ms\nPing do Usuário: ${message.createdTimestamp - interaction.createdTimestamp}ms`
        await interaction.editReply({
            content: newMessage
        });

    }
}
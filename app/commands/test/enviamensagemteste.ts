import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import enviaMensagemTeste from '../../helpers/messages/enviaMensagemTeste.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('enviamensagemteste')
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
        await interaction.deferReply({ephemeral: true});

        await enviaMensagemTeste()

        await interaction.editReply({
            content: 'Mensagem teste enviada no grupo de teste!'
        });

    }
}
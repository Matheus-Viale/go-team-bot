import { Client, ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, GuildMember } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('justificativafalta')
        .setDescription('Use para avisar quando não puder acompanhar as lives!'),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        const member = (interaction.member as GuildMember)
        await interaction.deferReply({ephemeral: true})
        if(!await verifyUserRoles(member, roleStreamerGoTeam)){
            await interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }     

        const modal = new ModalBuilder()
            .setCustomId('justificativa-falta')
            .setTitle('Justificativa de Faltas');

        const textInput = new TextInputBuilder()
            .setCustomId('justificativaFaltaInput')
            .setLabel('Justifique sua ausência abaixo:')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        
        modal.addComponents(new ActionRowBuilder().addComponents(textInput) as any);

        await interaction.showModal(modal);

    }
}
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { verifyUserRoles } = require('../../helpers/verifyUserRoles.js');
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('justificativafalta')
        .setDescription('Use para avisar quando não puder acompanhar as lives!'),
    async execute(interaction, client){
        
        if(!await verifyUserRoles(await interaction.member, roleStreamerGoTeam)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
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

        
        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal);

    }
}
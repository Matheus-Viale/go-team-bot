import { Client, ButtonBuilder, ButtonStyle, ModalSubmitInteraction, ActionRowBuilder } from 'discord.js';

module.exports = {
    data: {
        name:'say-button-modal'
    },
    async execute(interaction: ModalSubmitInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const button = eval(interaction.fields.getTextInputValue('sayButtonInput'));

        await interaction.channel.send({
            components: [new ActionRowBuilder().addComponents([button])] as any
        })

        await interaction.editReply({
            content: 'O botão foi enviado com sucesso!'
        })
    }
}
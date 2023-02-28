import { Client, ModalSubmitInteraction } from 'discord.js';

module.exports = {
    data: {
        name:'say-modal'
    },
    async execute(interaction: ModalSubmitInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const textInput = interaction.fields.getTextInputValue('sayInput');

        await interaction.channel.send({
            content: textInput
        })

        await interaction.editReply({
            content: 'A mensagem foi enviada com sucesso!'
        })
    }
}
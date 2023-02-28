import { Client, EmbedBuilder, ModalSubmitInteraction } from 'discord.js';

module.exports = {
    data: {
        name:'say-embed-modal'
    },
    async execute(interaction: ModalSubmitInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const embed = eval(interaction.fields.getTextInputValue('sayEmbedInput'));

        await interaction.channel.send({
            embeds: [embed]
        })

        await interaction.editReply({
            content: 'O embed foi enviado com sucesso!'
        })
    }
}
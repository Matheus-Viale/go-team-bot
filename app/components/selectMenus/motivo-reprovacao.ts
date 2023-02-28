import { AnySelectMenuInteraction, Client } from "discord.js"
module.exports = {
    data:{
        name: 'motivo-reprovacao'
    },
    async execute(interaction: AnySelectMenuInteraction, client: Client){
        //console.log(interaction.message.embeds[0].data.title)
        interaction.reply({
            content: 'Selecionado',
            ephemeral: true
        })
    }
}
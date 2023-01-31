module.exports = {
    data:{
        name: 'motivo-reprovacao'
    },
    async execute(interaction, client){
        //console.log(interaction.message.embeds[0].data.title)
        interaction.reply({
            content: 'Selecionado',
            ephemeral: true
        })
    }
}
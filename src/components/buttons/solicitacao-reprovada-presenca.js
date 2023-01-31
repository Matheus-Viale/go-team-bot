const { channelMarcarTwitch, channelNotificacoesStreamer } = require('../../helpers/globalVariables.js')

module.exports = {
    data:{
        name: 'solicitacao-reprovada-presenca'
    },
    async execute(interaction, client){
        const channelNotificacoesFetch = await client.channels.fetch(channelNotificacoesStreamer);
        const aprovadorUser = await interaction.user.username;
        const footerText = await interaction.message.embeds[0].data.footer.text;
        const streamerId = footerText.split('/')[0];
        const messageUserId = footerText.split('/')[1];
        const streamerTwitch = await interaction.message.embeds[0].data.title;
        const streamerNick = streamerTwitch.split('/')[1];
        const messageStaff = await interaction.message;
        const channel = client.channels.cache.get(channelMarcarTwitch);
        const messageUser = await channel.messages.fetch(messageUserId);
        const streamerUser = await client.users.fetch(streamerId);
        const dia = await interaction.message.embeds[0].data.fields[1].value;
        const horario = await interaction.message.embeds[0].data.fields[2].value;

        messageStaff.embeds[0].data.author.name = 'Solicitação REPROVADA BAIXA PRESENÇA';
        messageStaff.embeds[0].data.color = 0xf44336;
        messageUser.embeds[0].data.color = 0xf44336;
        /*interaction.message.components[0].components[0].data.disabled = true;
        interaction.message.components[0].components[1].data.disabled = true;
        interaction.message.components[0].components[2].data.disabled = true;
        interaction.message.components[1].components[0].data.disabled = true;*/

        interaction.update({
            content: `${aprovadorUser} reprovou a live de ${streamerTwitch}, para ${dia} às ${horario} por baixa presença!`,
            embeds: messageStaff.embeds,
            components:[]
        })

        streamerUser.send({
            content: `Olá ${streamerNick}, o seu agendamento para ${dia} às ${horario}(BR) foi reprovado por você possuir uma baixa presença nas lives! Para mais informações entrar em contato com a STAFF!`
        }).catch(error =>{
            channelNotificacoesFetch.send({
                content: `Olá <@${streamerId}>, o seu agendamento para ${dia} às ${horario}(BR) foi reprovado por você possuir uma baixa presença nas lives! Para mais informações entrar em contato com a STAFF!`
            })
        })

        messageUser.edit({
            embeds: messageUser.embeds
        })

        messageStaff.react('🚫')
        messageUser.react('🚫')
    }
}
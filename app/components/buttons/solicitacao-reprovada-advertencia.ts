import { Client, ButtonInteraction, GuildTextBasedChannel, EmbedBuilder } from 'discord.js';
const { channelMarcarTwitch, channelNotificacoesStreamer } = require('../../helpers/globalVariables.js')

module.exports = {
    data:{
        name: 'solicitacao-reprovada-advertencia'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        const channelNotificacoesFetch = (await client.channels.fetch(channelNotificacoesStreamer) as GuildTextBasedChannel);
        const aprovadorUser = interaction.user.username;
        const footerText = interaction.message.embeds[0].data.footer.text;
        const streamerId = footerText.split('/')[0];
        const messageUserId = footerText.split('/')[1];
        const streamerTwitch = interaction.message.embeds[0].data.title;
        const streamerNick = streamerTwitch.split('/')[1];
        const messageStaff = (interaction.message as any);
        const channel = (await client.channels.fetch(channelMarcarTwitch) as GuildTextBasedChannel);
        const messageUser = (await channel.messages.fetch(messageUserId) as any);
        const streamerUser = await client.users.fetch(streamerId);
        const dia = interaction.message.embeds[0].data.fields[1].value;
        const horario = interaction.message.embeds[0].data.fields[2].value;

        messageStaff.embeds[0].data.author.name = 'Solicitação REPROVADA ADVERTÊNCIA';
        messageStaff.embeds[0].data.color = 0xf44336;
        messageUser.embeds[0].data.color = 0xf44336;
        /*interaction.message.components[0].components[0].data.disabled = true;
        interaction.message.components[0].components[1].data.disabled = true;
        interaction.message.components[0].components[2].data.disabled = true;
        interaction.message.components[1].components[0].data.disabled = true;*/

        interaction.update({
            content: `${aprovadorUser} reprovou a live de ${streamerTwitch}, para ${dia} às ${horario} por advertência!`,
            embeds: messageStaff.embeds,
            components:[]
        })

        const embed = new EmbedBuilder()
            .setColor(0xf44336)
            .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
            .setTitle('Solicitação de agendamento recusada!')
            .setDescription(`${streamerNick}, o seu agendamento para ${dia} às ${horario}(BR) foi reprovado por você possuir uma advertência!\nPara mais informações entrar em contato com a STAFF!`)
        ;

        streamerUser.send({
            embeds:[embed]
        }).catch(error =>{
            channelNotificacoesFetch.send({
                content: `<@${streamerId}>`,
                embeds:[embed]
            })
        })

        messageUser.edit({
            embeds: messageUser.embeds
        })

        messageStaff.react('⚠️')
        messageUser.react('⚠️')
    }
}
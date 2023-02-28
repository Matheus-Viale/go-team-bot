import { Client, EmbedBuilder, GuildTextBasedChannel } from 'discord.js';
import verifyUserIsOnlineTwitch from "../verifyUserIsOnlineTwitch";
const { channelNotificacoesStreamer } = require('../globalVariables.js');

const enviaMensagemLembrete = async (streamer: string, horaAgendamento: number, streamerId: string, client: Client) =>{
    const streamerUser = await client.users.fetch(streamerId);
    const channelNotificacoesFetch = (await client.channels.fetch(channelNotificacoesStreamer) as GuildTextBasedChannel);

    const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
            .setTitle('Live Offline!')
            .setDescription(`Olá ${streamer}, vimos que você ainda não está online para a sua live agendada às ${horaAgendamento}:00, caso não consiga abrir a live avise a STAFF imediatamente!`)
    ;

    if(await verifyUserIsOnlineTwitch(streamer) == 'offline'){
        streamerUser.send({
            embeds:[embed]
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `<@${streamerId}>`,
                embeds:[embed]
            })}
        )
    }
    
}

export default enviaMensagemLembrete;
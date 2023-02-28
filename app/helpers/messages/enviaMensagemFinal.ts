import { Client, EmbedBuilder, GuildTextBasedChannel } from 'discord.js';
const { channelNotificacoesStreamer } = require('../globalVariables.js');

const enviaMensagemFinal = async (streamer: string, horaAgendamento: number, streamerId: string, streamerRaid: string, client: Client) =>{
    const streamerUser = await client.users.fetch(streamerId);
    const channelNotificacoesFetch = (await client.channels.fetch(channelNotificacoesStreamer) as GuildTextBasedChannel);
    
    if(streamerRaid == 'ultimo'){

        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
            .setTitle('Último horário!')
            .setDescription(`${streamer}, você está no último horário da nossa agenda, pode prosseguir com a live até o horário que desejar`)
        ;

        streamerUser.send({
            embeds:[embed]
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `<@${streamerId}>`,
                embeds:[embed]
            })}
        )
        return;
    }

    if(streamerRaid == 'nenhum'){

        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
            .setTitle('Horário vago!')
            .setDescription(`${streamer}, o horário das ${horaAgendamento+2}:00 está vago, você pode continuar a sua live até às ${horaAgendamento+4}:00 se assim desejar, se não tiver condições de prosseguir a live, basta enviar o raid para o matheus_rib3, desta maneira /raid matheus_rib3`)
        ;


        streamerUser.send({
            embeds:[embed]
        }).catch(error => {
            channelNotificacoesFetch.send({
                content:`<@${streamerId}>`,
                embeds:[embed]
            })}
        )
        return;
    }

    const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
            .setTitle('Próximo Streamer!')
            .setDescription(`${streamer}, como foi a sua live? Tudo certo?, só vim pra avisar que estamos quase no horário do ${streamerRaid}, por favor, verifique se ele já se encontra online e realize a raid através de /raid ${streamerRaid}, se ele estiver offline, entre em contato com a STAFF imediatamente!`)
        ;

    streamerUser.send({
        embeds:[embed]
    }).catch(error =>{
            channelNotificacoesFetch.send({
            content:`<@${streamerId}>`,
            embeds:[embed]
        })}
    )
}

export default enviaMensagemFinal;
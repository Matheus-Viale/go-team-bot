import { Client, EmbedBuilder, GuildTextBasedChannel } from 'discord.js';
import getTwitchAvatar from '../getTwitchAvatar.js';
const { channelLiveTwitch, roleEveryone, guildId } = require('../globalVariables.js');


const enviaMensagemLive = async (streamer: string, horaAgendamento: number, client: Client) =>{
    const channelSelect = (await client.channels.fetch(channelLiveTwitch) as GuildTextBasedChannel);
    let streamerAvatar = await getTwitchAvatar(streamer);
    if(streamerAvatar == 'sem imagem'){
        streamerAvatar = 'https://i.imgur.com/j1yOXKJ.png'
    }
    const guild = await client.guilds.fetch(guildId);
    const roleEveryoneFetch = await guild.roles.fetch(roleEveryone)
    const embed = new EmbedBuilder()
        .setColor(0x6441A5)
        .setTitle('LIVE AGENDADA')
        .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
        .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: 'Horário', value: `⏰ ${horaAgendamento}:00 às ${horaAgendamento+2}:00 ⏰`, },
            {name: '\u200B', value: '\u200B'},
            {name: 'Regras para acompanhar a live!', value: '\u200B'},
            {name: '\u200B', value: '\u200B'},
            {name: '\u200B', value: 'Não deixe a live mutada!'},
            {name: '\u200B', value: 'Lembramos que a presença é feita atráves dos usuários do chat!'},
            {name: '\u200B', value: 'Sempre que possível interaja no chat, gentileza gera gentileza!'},
            {name: '\u200B', value: 'Não peça follow e afins no chat dos outros, isso incomoda e não dá resultados!'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Vai deixar em lurk?', value: '\u200B'},
            {name: '\u200B', value: 'Então acesse https://autolurk.000webhostapp.com para garantir que sempre estará presentes nas lives e não dependa das Raids!'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Streamer', value: `https://twitch.tv/${streamer}`},
        )
        .setImage(streamerAvatar)
    ;

    channelSelect.send({
        embeds: [embed],
        content: `${roleEveryoneFetch}\nStreamer agendado das ${horaAgendamento}:00`
    })
    
}

export default enviaMensagemLive;
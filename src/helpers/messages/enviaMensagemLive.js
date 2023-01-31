const { EmbedBuilder } = require('discord.js');
const { getTwitchAvatar } = require('../getTwitchAvatar.js');
const { channelLiveTwitch, roleEveryone, guildId } = require('../globalVariables.js');
const enviaMensagemLive = async (streamer, horaAgendamento, client) =>{
    const channelSelect = await client.channels.fetch(channelLiveTwitch);
    const streamerAvatar = await getTwitchAvatar(streamer);
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
            {name: 'Não deixe a live mutada!', value: '\u200B'},
            {name: 'Lembramos que a presença é feita atráves dos usuários do chat!', value: '\u200B'},
            {name: 'Sempre que possível interaja no chat, gentileza gera gentileza!', value: '\u200B'},
            {name: 'Não peça follow e afins no chat dos outros, isso incomoda e não dá resultados!', value: '\u200B'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Streamer', value: `https://twitch.tv/${streamer}`},
        )
        .setImage(streamerAvatar)
    ;

    channelSelect.send({
        embeds: [embed],
        content: `${roleEveryoneFetch}`
    })
    
}

module.exports = {
    enviaMensagemLive: enviaMensagemLive
}
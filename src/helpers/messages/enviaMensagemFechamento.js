const { EmbedBuilder } = require('discord.js');
const { channelMarcarTwitch, roleStreamerGoTeam } = require('../globalVariables.js');
const enviaMensagemFechamento = async (client) =>{
    const channelSelect = await client.channels.fetch(channelMarcarTwitch);
    const embed = new EmbedBuilder()
        .setColor(0x6441A5)
        .setTitle('AGENDA FECHADA')
        .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
        .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: 'Retorno?', value: 'Em breve a STAFF irá avaliar as solicitações e você receberá um aviso do bot com o retorno!'},
            {name: '\u200B', value: '\u200B'},
            {name: 'AVISO!', value: `Favor, habilitar o recebimento de mensagens diretas do servidor para poder receber as notificações do BOT via DM (Não se preocupe, não fazemos SPAM)`},
            {name: '\u200B', value: `\u200B`},
            {name: 'Legenda das Reações', value: `\u200B`},
            {name: '\u200B', value: `✅ - Significa que o streamer teve seu agendamento confirmado para a data e hora marcada!`},
            {name: '\u200B', value: `🏳️ - Significa que o streamer desistiu do agendamento!`},
            {name: '\u200B', value: `⚠️ - Significa que o streamer teve seu agendamento recusado pois possui uma advertência nos últimos 15 dias!`},
            {name: '\u200B', value: `🚫 - Significa que o streamer teve seu agendamento recusado pois possui uma baixa presença nas lives!`},
            {name: '\u200B', value: `⛔ - Significa que o streamer teve seu agendamento recusado pois outro streamer tem a prioridade maior!`},
        )
    ;

    channelSelect.send({
        embeds: [embed],
        content: `<@&${roleStreamerGoTeam}>`
    })
    
}

module.exports = {
    enviaMensagemFechamento: enviaMensagemFechamento
}
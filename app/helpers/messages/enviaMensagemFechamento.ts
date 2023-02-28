import { Client, EmbedBuilder, GuildTextBasedChannel } from 'discord.js';
const { channelMarcarTwitch, roleStreamerGoTeam } = require('../globalVariables.js');


const enviaMensagemFechamento = async (client: Client) =>{
    const channelSelect = (await client.channels.fetch(channelMarcarTwitch) as GuildTextBasedChannel);
    const date = new Date()
    const diaAgenda = date.getDay() + 1
    let diaAgendaString;

    if(diaAgenda == 1) diaAgendaString = 'SEGUNDA';
    if(diaAgenda == 2) diaAgendaString = 'TERÇA';
    if(diaAgenda == 3) diaAgendaString = 'QUARTA';
    if(diaAgenda == 4) diaAgendaString = 'QUINTA';
    if(diaAgenda == 5) diaAgendaString = 'SEXTA';
    if(diaAgenda == 6) diaAgendaString = 'SÁBADO';
    if(diaAgenda == 7) diaAgendaString = 'DOMINGO';

    const embed = new EmbedBuilder()
        .setColor(0x6441A5)
        .setTitle(`AGENDA DE ${diaAgendaString} FECHADA`)
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
        content: `<@&${roleStreamerGoTeam}>\nAGENDA DE ${diaAgendaString} FECHADA`
    })
    
}

export default enviaMensagemFechamento;
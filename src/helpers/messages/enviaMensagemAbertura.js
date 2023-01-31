const { EmbedBuilder } = require('discord.js');
const { channelMarcarTwitch, roleStreamerGoTeam } = require('../globalVariables.js');
const enviaMensagemAbertura = async (client) =>{
    const channelSelect = await client.channels.fetch(channelMarcarTwitch);
    const embed = new EmbedBuilder()
        .setColor(0x6441A5)
        .setTitle('AGENDA ABERTA')
        .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
        .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
        .addFields(
            {name: '\u200B', value: '\u200B'},
            {name: 'Solicitações de agendamento', value: 'O horário para as solicitações é das 12:00 às 18:00 (BR), e os agendamento são para o dia seguinte'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Horário', value: `A solicitação de agendamento pode ser feita das 12:00 às 18:00 (BR) / 15:00 às 21:00 (PT), e os agendamento são para o dia seguinte`},
            {name: '\u200B', value: `\u200B`},
            {name: 'Como solicitar?', value: 'Basta digitar o comando "/solicitaragendamento" e selecionar as opções de dia e hora'},
            {name: 'Preenchimento?', value: 'Caso tenha passado do horário de solicitações e a STAFF informou que existem horários disponíves, basta usar a opção preenchimento SIM e poderá fazer a solicitação fora de horário'},
            {name: 'AVISO!', value: 'O uso da opção de preenchimento sem autorização da STAFF resultará em advertência!'},
            {name: '\u200B', value: `\u200B`},
            {name: 'Requisitos para agendar!', value: '\u200B'},
            {name: '\u200B', value: 'Estar acompanhando as lives!'},
            {name: '\u200B', value: 'Não possuir advertências nos últimos 15 dias!'},
            {name: '\u200B', value: 'Se esses dois requisitos estiverem atendidos o agendamento é livre, porém a aprovação dele dependerá dos requisitos prioritários se outro streamer tiver interesse no mesmo horário!'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Requisitos Prioritários (em ordem de peso)', value: '\u200B'},
            {name: '\u200B', value: 'O Streamer que ainda não tiver realizado live na semana terá prioridade máxima!'},
            {name: '\u200B', value: 'O Streamer que tiver realizado menos lives na semana!'},
            {name: '\u200B', value: 'O Streamer que tiver realizado live a mais tempo na semana!'},
            {name: '\u200B', value: 'O Streamer que estiver com a melhor média de presença!'},
            {name: '\u200B', value: 'O Streamer que tiver realizado a solicitação antes!'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Dúvidas?', value: 'Entre em contato com a STAFF!'}
        )
    ;
    channelSelect.send({
        embeds: [embed],
        content: `<@&${roleStreamerGoTeam}>`
    })
    
}

module.exports = {
    enviaMensagemAbertura: enviaMensagemAbertura
}
const { verifyUserIsOnlineTwitch } = require("../verifyUserIsOnlineTwitch");
const { channelNotificacoesStreamer } = require('../globalVariables.js');

const enviaMensagemLembrete = async (streamer, horaAgendamento, streamerId, client) =>{
    const streamerUser = await client.users.fetch(streamerId);
    const channelNotificacoesFetch = await client.channels.fetch(channelNotificacoesStreamer);

    if(await verifyUserIsOnlineTwitch(streamer) == 'offline'){
        streamerUser.send({
            content: `Olá ${streamer}, vimos que você ainda não está online para a sua live agendada às ${horaAgendamento}:00, caso não consiga abrir a live avise a STAFF imediatamente!`
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `Olá <@${streamerId}>, vimos que você ainda não está online para a sua live agendada às ${horaAgendamento}:00, caso não consiga abrir a live avise a STAFF imediatamente!`
            })}
        )
    }
    
}

module.exports = {
    enviaMensagemLembrete: enviaMensagemLembrete
}
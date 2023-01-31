const { channelNotificacoesStreamer } = require('../globalVariables.js');

const enviaMensagemFinal = async (streamer, horaAgendamento, streamerId, streamerRaid, client) =>{
    const streamerUser = await client.users.fetch(streamerId);
    const channelNotificacoesFetch = await client.channels.fetch(channelNotificacoesStreamer);
    
    if(streamerRaid == 'ultimo'){
        streamerUser.send({
            content:`${streamer}, você está no último horário da nossa agenda, pode prosseguir com a live até o horário que desejar`
        }).catch(error => {
            channelNotificacoesFetch.send({
                content: `<@&${streamerId}>, você está no último horário da nossa agenda, pode prosseguir com a live até o horário que desejar`
            })}
        )
        return;
    }

    if(streamerRaid == 'nenhum'){
        streamerUser.send({
            content:`${streamer}, o horário das ${horaAgendamento+2}:00 está vago, você pode continuar a sua live até às ${horaAgendamento+4}:00 se assim desejar, se não tiver condições de prosseguir a live, basta enviar o raid para o matheus_rib3, desta maneira /raid matheus_rib3`
        }).catch(error => {
            channelNotificacoesFetch.send({
                content:`<@&${streamerId}>, o horário das ${horaAgendamento+2}:00 está vago, você pode continuar a sua live até às ${horaAgendamento+4}:00 se assim desejar, se não tiver condições de prosseguir a live, basta enviar o raid para o matheus_rib3, desta maneira /raid matheus_rib3`
            })}
        )
        return;
    }


    streamerUser.send({
        content:`${streamer}, como foi a sua live? Tudo certo?, só vim pra avisar que estamos quase no horário do ${streamerRaid}, por favor, verifique se ele já se encontra online e realize a raid através de /raid ${streamerRaid}, se ele estiver offline, entre em contato com a STAFF imediatamente!`
    }).catch(error =>{
            channelNotificacoesFetch.send({
            content:`<@${streamerId}> estamos quase no horário do ${streamerRaid}, por favor, verifique se ele já se encontra online e realize a raid através de /raid ${streamerRaid}, se ele estiver offline, entre em contato com a STAFF imediatamente!`
        })}
    )
}

module.exports = {
    enviaMensagemFinal: enviaMensagemFinal
}
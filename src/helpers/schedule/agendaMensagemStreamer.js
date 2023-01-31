const schedule = require('node-schedule');
const { enviaMensagemFinal } = require('../messages/enviaMensagemFinal.js');
const { enviaMensagemLembrete } = require('../messages/enviaMensagemLembrete.js');
const { enviaMensagemLive } = require('../messages/enviaMensagemLive.js');
const { getRaidStreamer } = require('../messages/getRaidStreamer.js');

const agendaMensagemStreamer = async (dataAgendamento, diaAgendamento, horaAgendamento, streamer, streamerId, streamerNickname, dataStringAgendamento, client) =>{
    const dateLembrete = dataAgendamento.setHours(horaAgendamento-1, 50, 00, 00);
    const dateLive = dataAgendamento.setHours(horaAgendamento, 05, 00, 00);
    const dateFinal = dataAgendamento.setHours(horaAgendamento+1, 55, 00, 00);
    schedule.scheduleJob('mensagemLembreteStreamer'+ diaAgendamento + horaAgendamento, dateLembrete,async ()=>{
        enviaMensagemLembrete(streamer, horaAgendamento, streamerId, client);
    });

    schedule.scheduleJob('mensagemLiveStreamer'+ diaAgendamento + horaAgendamento, dateLive,async ()=>{
        enviaMensagemLive(streamer, horaAgendamento, client);
    });

    schedule.scheduleJob('mensagemFinalStreamer'+ diaAgendamento + horaAgendamento, dateFinal,async ()=>{
        const streamerRaid = await getRaidStreamer(streamerNickname, horaAgendamento, dataStringAgendamento);
        enviaMensagemFinal(streamer, horaAgendamento, streamerId, streamerRaid, client);
    });
}

module.exports = {
    agendaMensagemStreamer: agendaMensagemStreamer
}
import { Client } from 'discord.js'
import schedule = require('node-schedule');
import enviaMensagemFinal from '../messages/enviaMensagemFinal.js';
import enviaMensagemLembrete from '../messages/enviaMensagemLembrete.js';
import enviaMensagemLive from '../messages/enviaMensagemLive.js';
import enviaMensagemLiveWpp from '../messages/enviaMensagemLiveWpp.js';
import getRaidStreamer from '../messages/getRaidStreamer.js';

const agendaMensagemStreamer = async (dataAgendamento: Date, diaAgendamento: number, horaAgendamento: number, streamerTwitch: string, streamerId: string, streamerNickname: string, dataStringAgendamento: string, client: Client) =>{
    const dateLembrete = dataAgendamento.setHours(horaAgendamento-1, 50, 0o0, 0o0);
    const dateLive = dataAgendamento.setHours(horaAgendamento, 0o5, 0o0, 0o0);
    const dateFinal = dataAgendamento.setHours(horaAgendamento+1, 55, 0o0, 0o0);
    
    try {
        schedule.scheduleJob('mensagemLembreteStreamer'+ diaAgendamento + horaAgendamento, dateLembrete,async ()=>{
            enviaMensagemLembrete(streamerTwitch, horaAgendamento, streamerId, client);
        });
    } catch (error) {
        console.log(error)
    }

    try {
        schedule.scheduleJob('mensagemLiveStreamer'+ diaAgendamento + horaAgendamento, dateLive,async ()=>{
            enviaMensagemLive(streamerTwitch, horaAgendamento, client);
        });
    } catch (error) {
        console.log(error)
    }
    try {
        schedule.scheduleJob('mensagemLiveStreamerWpp'+ diaAgendamento + horaAgendamento, dateLive,async ()=>{
            const streamerRaid = await getRaidStreamer(streamerNickname, horaAgendamento, dataStringAgendamento);
            enviaMensagemLiveWpp(streamerTwitch, horaAgendamento, streamerRaid);
        });
    } catch (error) {
        console.log(error)
    }
    try {
        schedule.scheduleJob('mensagemFinalStreamer'+ diaAgendamento + horaAgendamento, dateFinal,async ()=>{
            const streamerRaid = await getRaidStreamer(streamerNickname, horaAgendamento, dataStringAgendamento);
            enviaMensagemFinal(streamerTwitch, horaAgendamento, streamerId, streamerRaid, client);
        });
    } catch (error) {
        console.log(error)
    }
}

export default agendaMensagemStreamer;
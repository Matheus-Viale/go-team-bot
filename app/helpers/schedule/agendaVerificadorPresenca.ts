import { Client } from 'discord.js';
import schedule = require('node-schedule');
import armazenaPresencas from '../attendance/armazenaPresencas.js';


const agendaVerificadorPresenca = async (dataAgendamento: Date, diaAgendamento: number, horaAgendamento: number, streamerTwitch: string, client: Client) =>{
    const minutoAleatorio = Math.floor(Math.random() * (59 - 30) + 30);
    const minutoAleatorio2 = Math.floor(Math.random() * (55 - 30) + 30);
    const date = new Date(dataAgendamento.setHours(horaAgendamento, minutoAleatorio));
    const date2 = new Date(date.getTime() + (minutoAleatorio2 * 60000));
    try {
        schedule.scheduleJob('verificador1Streamer'+ diaAgendamento + horaAgendamento, date,async ()=>{
            armazenaPresencas(streamerTwitch, date, client);
        }) 
    } catch (error) {
        console.log(error)
    }
    try {
        schedule.scheduleJob('verificador2Streamer'+ diaAgendamento + horaAgendamento, date2,async ()=>{
            armazenaPresencas(streamerTwitch, date2, client);
        })
    } catch (error) {
        console.log(error)
    }
    
}

export default agendaVerificadorPresenca;
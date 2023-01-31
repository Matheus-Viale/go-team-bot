const { armazenaPresencas } = require('../attendance/armazenaPresencas.js');
const schedule = require('node-schedule');

const agendaVerificadorPresenca = async (dataAgendamento, diaAgendamento, horaAgendamento, streamer, client) =>{
    const minutoAleatorio = Math.floor(Math.random() * (59 - 30) + 30)
    const date = new Date(dataAgendamento.setHours(horaAgendamento, minutoAleatorio))
    schedule.scheduleJob('verificador1Streamer'+ diaAgendamento + horaAgendamento, date,async ()=>{
        armazenaPresencas(streamer, date, client);
    })
    const date2 = new Date(date.getTime() + 1800000)
    schedule.scheduleJob('verificador2Streamer'+ diaAgendamento + horaAgendamento, date2,async ()=>{
        armazenaPresencas(streamer, date2, client);
    })
}

module.exports = {
    agendaVerificadorPresenca: agendaVerificadorPresenca
}
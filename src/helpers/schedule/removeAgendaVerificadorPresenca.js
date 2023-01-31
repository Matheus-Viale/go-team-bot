const schedule = require('node-schedule');

const removeAgendaVerificadorPresenca = async (diaAgendamento, horaAgendamento) => {
    const agendamento1Tag = 'verificador1Streamer' + diaAgendamento + horaAgendamento;
    const agendamento2Tag = 'verificador2Streamer' + diaAgendamento + horaAgendamento;
    const agendamento1Criado = schedule.scheduleJob[agendamento1Tag];
    const agendamento2Criado = schedule.scheduleJob[agendamento2Tag];
    agendamento1Criado.cancel();
    agendamento2Criado.cancel();
}

module.exports= {
    removeAgendaVerificadorPresenca: removeAgendaVerificadorPresenca
}
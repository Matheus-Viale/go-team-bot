const schedule = require('node-schedule');

const removeAgendaMensagemStreamer = async (diaAgendamento, horaAgendamento) => {
    const agendamento1Tag = 'mensagemLembreteStreamer' + diaAgendamento + horaAgendamento;
    const agendamento2Tag = 'mensagemLiveStreamer' + diaAgendamento + horaAgendamento;
    const agendamento3Tag = 'mensagemFinalStreamer' + diaAgendamento + horaAgendamento;
    const agendamento1Criado = await schedule.scheduleJob[agendamento1Tag];
    const agendamento2Criado = await schedule.scheduleJob[agendamento2Tag];
    const agendamento3Criado = await schedule.scheduleJob[agendamento3Tag];
    if(agendamento1Criado){
        agendamento1Criado.cancel();
    }
    if(agendamento2Criado){
        agendamento2Criado.cancel();
    }
    if(agendamento3Criado){
        agendamento3Criado.cancel();
    }
    
}

module.exports= {
    removeAgendaMensagemStreamer: removeAgendaMensagemStreamer
}
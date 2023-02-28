import schedule = require('node-schedule');

const removeAgendaMensagemStreamer = async (diaAgendamento: number, horaAgendamento: number) => {
    const agendamento1Tag = 'mensagemLembreteStreamer' + diaAgendamento + horaAgendamento;
    const agendamento2Tag = 'mensagemLiveStreamer' + diaAgendamento + horaAgendamento;
    const agendamento3Tag = 'mensagemFinalStreamer' + diaAgendamento + horaAgendamento;
    const agendamento4Tag = 'mensagemLiveStreamerWpp' + diaAgendamento + horaAgendamento;
    const agendamento1Criado = schedule.scheduledJobs[agendamento1Tag];
    const agendamento2Criado = schedule.scheduledJobs[agendamento2Tag];
    const agendamento3Criado = schedule.scheduledJobs[agendamento3Tag];
    const agendamento4Criado = schedule.scheduledJobs[agendamento4Tag];
    
    if(agendamento1Criado){
        try {
            agendamento1Criado.cancel();
        } catch (error) {
            console.log(error)
        }
    }
    
    if(agendamento2Criado){
        try {
            agendamento2Criado.cancel();
        } catch (error) {
            console.log(error)
        }
    }

    if(agendamento3Criado){
        try {
            agendamento3Criado.cancel();
        } catch (error) {
            console.log(error)
        }
    }

    if(agendamento4Criado){
        try {
            agendamento4Criado.cancel();
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default removeAgendaMensagemStreamer;
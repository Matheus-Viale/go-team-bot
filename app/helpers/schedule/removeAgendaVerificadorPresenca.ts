import schedule = require('node-schedule');

const removeAgendaVerificadorPresenca = async (diaAgendamento: number, horaAgendamento: number) => {
    const agendamento1Tag = 'verificador1Streamer' + diaAgendamento + horaAgendamento;
    const agendamento2Tag = 'verificador2Streamer' + diaAgendamento + horaAgendamento;
    const agendamento1Criado = schedule.scheduledJobs[agendamento1Tag];
    const agendamento2Criado = schedule.scheduledJobs[agendamento2Tag];
    
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
    
}

export default removeAgendaVerificadorPresenca;
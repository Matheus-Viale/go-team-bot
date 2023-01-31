const Agendamento = require('../../schemas/agendamento.js');

const getRaidStreamer = async (streamerNickname, horaAgendamento, dataStringAgendamento) =>{
    
    if(horaAgendamento == 22){
        return 'ultimo';
    }
    const queryTag = 'streamerAgendado' + (horaAgendamento + 2);
    let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});

    if(agendamentoCriado[queryTag] == 'nenhum'){
        return agendamentoCriado[queryTag];
    }

    const streamerName = agendamentoCriado[queryTag].split('/')[1];

    return streamerName;


}

module.exports = {
    getRaidStreamer: getRaidStreamer
}
import Agendamento from '../../schemas/agendamento.js';

const getRaidStreamer = async (streamerNickname: string, horaAgendamento: number, dataStringAgendamento: string) =>{
    
    if(horaAgendamento == 22){
        return 'ultimo';
    }
    type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22'
    const queryTag = ('streamerAgendado' + (horaAgendamento + 2) as Tag);
    let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});

    if(agendamentoCriado[queryTag] == 'nenhum'){
        return agendamentoCriado[queryTag];
    }

    const streamerName = agendamentoCriado[queryTag].split('/')[1];

    return streamerName;


}

export default getRaidStreamer;
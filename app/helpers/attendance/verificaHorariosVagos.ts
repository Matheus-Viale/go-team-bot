import Agendamento from '../../schemas/agendamento.js';

const verificaHorariosVagos = async (dataAgendamento: string) => {
    
    const agendamentos = await Agendamento.findOne({diaAgendamento: dataAgendamento});
    type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';
    const horariosVagos = [];
    let status = 'SEM AGENDAMENTO';
    if(agendamentos){
        for(let i = 10; i<=22; i+=2){
            const horarioTag = ('streamerAgendado' + i as Tag);
            if(agendamentos[horarioTag] == 'nenhum'){
                horariosVagos.push(i)
            }
        }

        if(horariosVagos.length == 0){
            status = 'SEM VAGAS';
        } else{
            status = 'OK';
        }
    }

    const retorno = {
        status: status,
        horariosVagos:horariosVagos
    }
    return retorno;
}

export default verificaHorariosVagos;
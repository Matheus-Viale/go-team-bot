import Agendamento from '../../schemas/agendamento.js';

const verificaLivesRecentes = async (diasAtras: number, streamerNickname: string) => {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - diasAtras)
    dataInicio.setHours(0o0,0o0,0o0,0o0)
    const agendamentos = await Agendamento.find({createdAt: {$gte: dataInicio}});
    let numeroLives = 0;
    const datasLives = [];
    type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';
    for(const agendamento of agendamentos){
        for(let i = 10; i<=22; i+=2){
            const horarioTag = ('streamerAgendado' + i as Tag);
            if(agendamento[horarioTag] == streamerNickname){
                numeroLives += 1
                datasLives.push(agendamento.diaAgendamento)
            }
        }
    }
    const retorno = {
        numeroLives: numeroLives,
        datasLives: datasLives.join(', ')
    }
    return retorno;
}

export default verificaLivesRecentes;
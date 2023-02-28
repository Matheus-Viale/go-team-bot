import Presenca from '../../schemas/presenca.js';

const verificaMediaPresenca = async (diasAtras: number, streamer: string) => {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - diasAtras)
    dataInicio.setHours(0o0,0o0,0o0,0o0)
    const presencas = await Presenca.find({createdAt: {$gte: dataInicio}});
    let numeroPresenca = 0;
    for(const presenca of presencas){
        const viewers = Object.values(presenca.viewers);
        const found = await viewers.find(element => element == streamer.toLowerCase());
        if(found){
            numeroPresenca += 1
        }
    }
    const media = Math.floor((numeroPresenca / presencas.length) * 100) + '%'
    const retorno = {
        totalLives: presencas.length,
        presenca: numeroPresenca,
        mediaPresenca: media
    }
    return retorno;
}

export default verificaMediaPresenca;
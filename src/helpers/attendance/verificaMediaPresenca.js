const Presenca = require('../../schemas/presenca.js');

const verificaMediaPresenca = async (diasAtras, streamer) => {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - diasAtras)
    dataInicio.setHours(00,00,00,00)
    const presencas = await Presenca.find({createdAt: {$gte: dataInicio}});
    let numeroPresenca = 0;
    for(const presenca of presencas){
        const viewers = Object.values(presenca.viewers);
        const found = await viewers.find(element => element == streamer);
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

module.exports = {
    verificaMediaPresenca: verificaMediaPresenca
}
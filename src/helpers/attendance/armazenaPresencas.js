const { verificadorPresenca } = require('./verificadorPresenca.js');
const { channelListaPresenca } = require('../globalVariables.js');
const Presenca = require('../../schemas/presenca.js');
const mongoose = require('mongoose');

const armazenaPresencas = async (streamer, data, client) => {
    const retornoVerificadorPresenca = await verificadorPresenca(streamer);
    const viewersArray = retornoVerificadorPresenca.viewersArray;
    const viewersString = retornoVerificadorPresenca.viewersString;
    const qntdViewers = retornoVerificadorPresenca.qntdViewers;
    const dataStream = data.toLocaleDateString();
    const horaVerificação = data.toLocaleTimeString();
    const streamerVerificacao = streamer;

    const listagemPresenca = new Presenca({
        _id: mongoose.Types.ObjectId(),
        dataDaStream: dataStream,
        horaDaVerificacao: horaVerificação,
        streamer: streamerVerificacao,
        qntdViewers: qntdViewers,
    })

    const listaViewers = {};
    for(const [i , viewer] of viewersArray.entries()){
        const newSchemaTag = 'viewer' + (i+1);
        listaViewers[newSchemaTag] = viewer
    }

    listagemPresenca.viewers = listaViewers;
    listagemPresenca.markModified('viewers');
    await listagemPresenca.save().catch(console.error);

    const channel = client.channels.cache.get(channelListaPresenca);
    channel.send({
        content: `Streamer: ${streamer}\n\nViewers:\n${viewersString}`
    })
}

module.exports = {
    armazenaPresencas: armazenaPresencas
}
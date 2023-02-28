import { Client, GuildTextBasedChannel } from 'discord.js';
import verificadorPresenca from './verificadorPresenca.js';
import Presenca from '../../schemas/presenca.js';
import mongoose from 'mongoose';
const { channelListaPresenca } = require('../globalVariables.js');

const armazenaPresencas = async (streamerTwitch: string, data: Date, client: Client) => {
    const retornoVerificadorPresenca = await verificadorPresenca(streamerTwitch);
    const viewersArray = retornoVerificadorPresenca.viewersArray;
    const viewersString = retornoVerificadorPresenca.viewersString;
    const qntdViewers = retornoVerificadorPresenca.qntdViewers;
    const dataStream = data.toLocaleDateString('pt-BR');
    const horaVerificação = data.toLocaleTimeString('pt-BR');
    const streamerVerificacao = streamerTwitch;

    const listagemPresenca = new Presenca({
        _id: new mongoose.Types.ObjectId(),
        createdAt: data,
        dataDaStream: dataStream,
        horaDaVerificacao: horaVerificação,
        streamer: streamerVerificacao,
        qntdViewers: qntdViewers,
    })

    const listaViewers: any = {};
    for(const [i , viewer] of viewersArray.entries()){
        const newSchemaTag = 'viewer' + (i+1);
        listaViewers[newSchemaTag] = viewer
    }

    listagemPresenca.viewers = listaViewers;
    listagemPresenca.markModified('viewers');
    await listagemPresenca.save().catch(console.error);

    const channel = (await client.channels.fetch(channelListaPresenca) as GuildTextBasedChannel);
    if(viewersString.length > 3500){
        const messageSplit = viewersString.match(/.{1,3500}/g)
        await channel.send({
            content:`Streamer: ${streamerTwitch}\n\nViewers:`
        }).catch(console.error);
        for(const message of messageSplit){
            await channel.send({
                content:`${message}`
            }).catch(console.error);
        }
        return;
    }
    channel.send({
        content: `Streamer: ${streamerTwitch}\n\nViewers:\n${viewersString}`
    }).catch(console.error);
}

export default armazenaPresencas;
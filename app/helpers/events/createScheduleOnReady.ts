import { Client } from 'discord.js';
import Agendamento from '../../schemas/agendamento.js';
import agendaMensagemStreamer from '../schedule/agendaMensagemStreamer.js';
import agendaVerificadorPresenca from '../schedule/agendaVerificadorPresenca.js';
const { guildId } = require('../globalVariables.js');

async function createScheduleOnReady(client: Client) {

    const dataAgendamento = new Date();
    const horaReady = dataAgendamento.getHours();
    const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
    let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
    type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';

    if(!agendamentoCriado) return;

    const diaAgendamento = dataAgendamento.getDate();

    for(let i = 10; i <= 22; i+=2){

        if(i <= horaReady || horaReady == i+1) continue;

        const horarioTag = ('streamerAgendado' + i) as Tag;
        const streamerNickname = agendamentoCriado[horarioTag];
        if(streamerNickname == 'nenhum') continue;
        const streamerTwitch = streamerNickname.split('/')[1];
        const guild = await client.guilds.fetch(guildId);

        try {
            const streamerId = guild.members.cache.find(member => member.displayName == streamerNickname).id;
            await agendaMensagemStreamer(dataAgendamento, diaAgendamento, i, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
            await agendaVerificadorPresenca(dataAgendamento, diaAgendamento, i, streamerTwitch, client);
        } catch (error) {
            console.error;
        }
    }

    
}

export default createScheduleOnReady;
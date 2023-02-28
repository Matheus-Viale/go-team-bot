import { Client } from "discord.js";
import Agendamento from "../schemas/agendamento";
import mongoose = require('mongoose');
import agendaMensagemStreamer from "./schedule/agendaMensagemStreamer";
import agendaVerificadorPresenca from "./schedule/agendaVerificadorPresenca";
import verificaDias from "./verificaDias";

async function agendaSolicitacaoAprovada(streamerId: string, streamerNickname: string, diaStringAgendamento: string, horaAgendamentoString: string, client: Client){

    const situacaoAgendamento = verificaDias(diaStringAgendamento);

    if(situacaoAgendamento.liberarAgendamento){
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + situacaoAgendamento.diaAgendamento);
        const diaAgendamento = dataAgendamento.getDate();
        const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
        const horaAgendamento = parseInt(horaAgendamentoString.split(':')[0]);
        const streamerTwitch = streamerNickname.split('/')[1];

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';
        const horarioTag = ('streamerAgendado' + horaAgendamento) as Tag;

        if(agendamentoCriado){
            if(agendamentoCriado[horarioTag] != 'nenhum'){
                return 'OCUPADO';
            }
        } else{
            agendamentoCriado = new Agendamento({
                _id: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
                diaAgendamento: dataStringAgendamento
            });
        }

        agendamentoCriado[horarioTag] = streamerNickname;
        await agendamentoCriado.save().then(async novoAgendamento =>{
            await agendaMensagemStreamer(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
            await agendaVerificadorPresenca(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, client);
        });
        return 'SUCESSO';
    }

    return 'INVALIDO';
}

export default agendaSolicitacaoAprovada;
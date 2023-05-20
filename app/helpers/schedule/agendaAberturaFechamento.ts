import schedule = require('node-schedule');
import {Client} from 'discord.js';
import enviaMensagemAbertura from '../messages/enviaMensagemAbertura.js';
import enviaMensagemAberturaWpp from '../messages/enviaMensagemAberturaWpp.js';
import enviaMensagemFechamento from '../messages/enviaMensagemFechamento.js';
import enviaMensagemFechamentoWpp from '../messages/enviaMensagemFechamentoWpp.js';
import alteraStatusPreenchimento from '../alteraStatusPreenchimento.js';

const agendaAberturaFechamento = async (client: Client) =>{
    schedule.scheduleJob('mensageAbertura', '0 12 * * *',async ()=>{
        enviaMensagemAbertura(client);
        enviaMensagemAberturaWpp();
        alteraStatusPreenchimento('desativado')
    });

    schedule.scheduleJob('mensagemFechamento', '0 21 * * *',async ()=>{
        enviaMensagemFechamento(client);
        enviaMensagemFechamentoWpp();
    });

}

export default agendaAberturaFechamento;
const schedule = require('node-schedule');
const { enviaMensagemAbertura } = require('../messages/enviaMensagemAbertura.js');
const { enviaMensagemFechamento } = require('../messages/enviaMensagemFechamento.js');

const agendaAberturaFechamento = async (client) =>{
    schedule.scheduleJob('mensageAbertura', '0 12 * * *',async ()=>{
        enviaMensagemAbertura(client);
    });

    schedule.scheduleJob('mensagemFechamento', '0 18 * * *',async ()=>{
        enviaMensagemFechamento(client);
    });

}

module.exports = {
    agendaAberturaFechamento: agendaAberturaFechamento
}
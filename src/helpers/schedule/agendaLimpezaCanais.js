
const schedule = require('node-schedule');
const { clearChannel } = require('../clearChannel');
const { channelSolicitacaoAgendamentosStaff, channelMarcarTwitch, channelLiveTwitch } = require('../globalVariables.js');

const agendaLimpezaCanais = async (client) =>{
    schedule.scheduleJob('limparCanais','0 30 11 * * *', () =>{
        clearChannel(client, channelSolicitacaoAgendamentosStaff);
        clearChannel(client, channelMarcarTwitch);
        clearChannel(client, channelLiveTwitch);
    })
}

module.exports = {
    agendaLimpezaCanais: agendaLimpezaCanais
}
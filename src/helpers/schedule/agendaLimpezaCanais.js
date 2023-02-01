
const schedule = require('node-schedule');
const { clearChannel } = require('../clearChannel');
const { channelSolicitacaoAgendamentosStaff, channelMarcarTwitch, channelLiveTwitch } = require('../globalVariables.js');

const agendaLimpezaCanais = async (client) =>{
    schedule.scheduleJob('limparCanais','0 30 09 * * *', () =>{
        clearChannel(client, channelMarcarTwitch);
        clearChannel(client, channelLiveTwitch);
    })
}

module.exports = {
    agendaLimpezaCanais: agendaLimpezaCanais
}
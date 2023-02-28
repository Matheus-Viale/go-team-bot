
import { Client } from 'discord.js';
import schedule = require('node-schedule');
import clearChannel from '../clearChannel';
const { channelSolicitacaoAgendamentosStaff, channelMarcarTwitch, channelLiveTwitch } = require('../globalVariables.js');

const agendaLimpezaCanais = async (client: Client) =>{
    schedule.scheduleJob('limparCanais','0 30 09 * * *', () =>{
        clearChannel(client, channelMarcarTwitch);
        clearChannel(client, channelLiveTwitch);
    })
}

export default agendaLimpezaCanais;
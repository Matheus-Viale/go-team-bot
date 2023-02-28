import { Client } from 'discord.js';
import createScheduleOnReady from '../../helpers/events/createScheduleOnReady.js';
import agendaAberturaFechamento from "../../helpers/schedule/agendaAberturaFechamento.js";
import { startBot } from '../../helpers/wpp/botWppInitialize.js';
import { clientWpp } from '../../helpers/wpp/botWppInitialize.js';
const { agendaLimpezaCanais } = require("../../helpers/schedule/agendaLimpezaCanais.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client: Client){
        agendaAberturaFechamento(client);
        startBot(clientWpp);
        createScheduleOnReady(client);
        //agendaLimpezaCanais(client);
        console.log(`${client.user.tag} está funcionando!`);
    }
}
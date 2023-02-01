const { agendaAberturaFechamento } = require("../../helpers/schedule/agendaAberturaFechamento.js");
const { agendaLimpezaCanais } = require("../../helpers/schedule/agendaLimpezaCanais.js");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        agendaAberturaFechamento(client);
        //agendaLimpezaCanais(client);
        console.log(`${client.user.tag} está funcionando!`);
    }
}
import { clientWpp } from "../wpp/botWppInitialize";

const { grupoWpp } = require('../globalVariables.js');

async function enviaMensagemAberturaWpp(){

    const date = new Date()
    const diaAgenda = date.getDay() + 1
    let diaAgendaString;

    if(diaAgenda == 1) diaAgendaString = 'SEGUNDA';
    if(diaAgenda == 2) diaAgendaString = 'TERÇA';
    if(diaAgenda == 3) diaAgendaString = 'QUARTA';
    if(diaAgenda == 4) diaAgendaString = 'QUINTA';
    if(diaAgenda == 5) diaAgendaString = 'SEXTA';
    if(diaAgenda == 6) diaAgendaString = 'SÁBADO';
    if(diaAgenda == 7) diaAgendaString = 'DOMINGO';

    const mensagem = `AGENDA DE ${diaAgendaString} ABERTA\n\nHorário\nA solicitação de agendamento pode ser feita das 12:00 às 21:00 (BR) / 15:00 às 00:00 (PT), e os agendamento são para o dia seguinte\n\nComo solicitar?\nBasta digitar o comando "/solicitaragendamento" no Discord e selecionar as opções de dia e hora.\n\nRequisitos para agendar:\n\n1. Estar acompanhando as lives!\n2. Não possuir advertências nos últimos 15 dias!\n3. Se esses dois requisitos estiverem atendidos o agendamento é livre, porém a aprovação dele dependerá dos requisitos prioritários (conferir os requisitos prioritários no Discord) se outro streamer tiver interesse no mesmo horário!`
    
    
    await clientWpp.sendMessage(grupoWpp, mensagem);
    
}

export default enviaMensagemAberturaWpp;


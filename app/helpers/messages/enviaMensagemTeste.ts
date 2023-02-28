import { clientWpp } from "../wpp/botWppInitialize";

async function enviaMensagemTeste(){

    await clientWpp.sendMessage('120363030374812808@g.us', 'Mensagem de Teste');
    
}

export default enviaMensagemTeste;
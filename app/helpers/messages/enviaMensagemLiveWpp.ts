import { MessageMedia } from 'whatsapp-web.js';
import getTwitchAvatar from '../getTwitchAvatar.js';
import { clientWpp } from '../wpp/botWppInitialize';
const { grupoWpp } = require('../globalVariables.js');

async function enviaMensagemLiveWpp(streamer: string, horario: number, streamerRaid: string){
    let streamerAvatar = await getTwitchAvatar(streamer);
    if(streamerAvatar == 'sem imagem'){
        streamerAvatar = 'https://i.imgur.com/j1yOXKJ.png';
    }

    let media;
    try {
        media = await MessageMedia.fromUrl(streamerAvatar);
    } catch (error) {
        console.log(error)
    }
    
    const mensagem = `LIVE AGENDADA:\n\nLINK: https://twitch.tv/${streamer}\n\n⏰ ${horario}:00 às ${horario + 2}:00 ⏰\n\nPróximo Streamer: /raid ${streamerRaid}\n\nINSTRUÇÕES PARA AS LIVES:\n\n1. Não deixe a live mutada!\n2. Lembramos que a presença é feita atráves dos usuários do chat!\n3. Sempre que possível interaja no chat, gentileza gera gentileza!\n4. Não peça follow e afins no chat dos outros, isso incomoda e não dá resultados!\n\nVai deixar em lurk?\nEntão acesse https://autolurk.000webhostapp.com para garantir que sempre estará presentes nas lives e não dependa das Raids!`
    
    if(media){
        await clientWpp.sendMessage(grupoWpp, media, {caption: mensagem});
        return;
    }

    await clientWpp.sendMessage(grupoWpp, mensagem);
    
    
}

export default enviaMensagemLiveWpp;


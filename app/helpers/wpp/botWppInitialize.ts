import qrcode = require('qrcode-terminal');
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';

export const clientWpp = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

export async function startBot(client: Client){

    clientWpp.on('qr', qr =>{
        qrcode.generate(qr, {small: true});
    });
    
    clientWpp.on('ready', () =>{
        console.log('Wpp Client está pronto!');
    });

    await clientWpp.initialize()
    
}
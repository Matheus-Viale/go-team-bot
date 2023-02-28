//Discord Não permite que seja deletado mais de 100 mensagens por comando, tenha isso em mente!
import { Client, GuildTextBasedChannel} from 'discord.js';

const clearChannel = async (client: Client, channel: string) => {
    
    const channelSelect = await client.channels.fetch(channel);
    
    let messages;
    do{
        messages = await (channelSelect as GuildTextBasedChannel).messages.fetch({limit: 100});
        //(channelSelect as GuildTextBasedChannel).bulkDelete(fetched);
        if(messages){
            for(const message of messages){
                await message[1].delete();
            }
        }
    }
    while(messages.size >= 2);
    
}

export default clearChannel;
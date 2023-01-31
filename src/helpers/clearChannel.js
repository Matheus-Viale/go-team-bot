//Discord Não permite que seja deletado mais de 100 mensagens por comando, tenha isso em mente!
const clearChannel = async (client, channel) => {
    
    const channelSelect = await client.channels.fetch(channel);
    
    let fetched;
    do{
        fetched = await channelSelect.messages.fetch({limit: 100});
        channelSelect.bulkDelete(fetched);
    }
    while(fetched.size >= 2);

}

module.exports = {
    clearChannel: clearChannel
}
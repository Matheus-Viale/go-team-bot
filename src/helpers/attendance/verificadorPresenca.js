const axios = require('axios');

const verificadorPresenca = async (streamer) =>{
    //const streamerName = streamer.split('/')[1] 'twitch.tv/NomeDoStreamer' 
    let viewersString = '';
    let viewersArray= [];
    let qntdViewers;
    await axios.get(`https://tmi.twitch.tv/group/user/${streamer}/chatters`)
        .then((response) =>{
            const data = response.data;
            qntdViewers = data.chatter_count;
            viewersString = data.chatters.vips.join(',  ') + data.chatters.moderators.join(',  ') + data.chatters.viewers.join(',  ')
            viewersArray = data.chatters.vips.concat(data.chatters.moderators).concat(data.chatters.viewers)
        })

    return {
        qntdViewers: qntdViewers,
        viewersArray: viewersArray,
        viewersString: viewersString
    }
}

module.exports = {
    verificadorPresenca: verificadorPresenca
}
const axios = require('axios');

const getTwitchAvatar = async (streamer) =>{
    const apiURL = `https://decapi.me/twitch/avatar/${streamer}`;
    let streamerAvatar;
    await axios.get(apiURL)
        .then((response) => {
            streamerAvatar = response.data;
        }).catch((err) => console.log(err));
    
    if(!streamerAvatar){
        streamerAvatar = 'sem imagem'
    }

    return streamerAvatar;
}

module.exports = {
    getTwitchAvatar: getTwitchAvatar
}
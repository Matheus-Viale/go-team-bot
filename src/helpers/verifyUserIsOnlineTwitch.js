const axios = require('axios');

const verifyUserIsOnlineTwitch = async (streamer) => {
    const apiURL = `https://decapi.me/twitch/uptime/${streamer}`;
    let status = '';
    await axios.get(apiURL)
        .then((response) => {
            const data = response.data;
            if(data === `${streamer} is offline`){
                status = 'offline';
            }else{
                status = 'online';
            }
        })
    return status;
}

module.exports = {
    verifyUserIsOnlineTwitch: verifyUserIsOnlineTwitch
}
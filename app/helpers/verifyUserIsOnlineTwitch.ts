import axios from 'axios';

const verifyUserIsOnlineTwitch = async (streamer: string) => {
    const apiURL = `https://decapi.me/twitch/uptime/${streamer}`;
    let status = '';
    await axios.get(apiURL)
        .then((response) => {
            const data = response.data;
            if(data === `${streamer} is offline`){
                status = 'offline';
            }else if(data == '[Error from Twitch API] 400: Bad Request - Malformed query params.'){
                status = 'inexistente'
            }else{
                status = 'online';
            }
        }).catch(error =>{
            status = 'inexistente'
        })
    return status;
}

export default verifyUserIsOnlineTwitch;
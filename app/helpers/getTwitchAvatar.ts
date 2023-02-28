import axios from 'axios';

const getTwitchAvatar = async (streamer: string) =>{
    const apiURL = `https://decapi.me/twitch/avatar/${streamer.toLowerCase()}`;
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

export default getTwitchAvatar;
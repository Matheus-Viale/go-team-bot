import axios from 'axios';

const verificadorPresenca = async (streamerTwitch: string) =>{
    let viewersString = '';
    let viewersArray: string[] = [];
    let qntdViewers;
    await axios.get(`https://tmi.twitch.tv/group/user/${streamerTwitch.toLowerCase()}/chatters`)
        .then((response) =>{
            const data = response.data;
            qntdViewers = data.chatter_count;
            viewersString = data.chatters.vips.join(',  ') + data.chatters.moderators.join(',  ') + data.chatters.viewers.join(',  ')
            viewersArray = data.chatters.vips.concat(data.chatters.moderators).concat(data.chatters.viewers)
        }).catch(err =>{
            console.log(err)
        })

    return {
        qntdViewers: qntdViewers,
        viewersArray: viewersArray,
        viewersString: viewersString
    }
}

export default verificadorPresenca;
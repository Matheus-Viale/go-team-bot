import { Client, EmbedBuilder, User, GuildTextBasedChannel } from 'discord.js';
const { channelLogs } = require('../../helpers/globalVariables.js')

module.exports = {
    name: 'userUpdate',
    async execute(oldUser: User, newUser: User, client: Client){
        const userId = newUser.id;
        const userName = newUser.username;
        const userTag = newUser.tag;
        const userAvatar = newUser.avatarURL();
        const channel = (await client.channels.fetch(channelLogs) as GuildTextBasedChannel);

        let oldUserAvatar = oldUser.avatarURL();
        if(!oldUserAvatar){
            oldUserAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png'
        }

        if(userAvatar == oldUserAvatar){
            return;
        }


        const embed = new EmbedBuilder()
            .setColor(0x03c03c)
            .setAuthor({ name: `${userTag}`})
            .setTitle(`O usuário ${userName} alterou sua imagem de perfil!`)
            .setThumbnail(`${oldUserAvatar}`)
            .addFields(
                {name: 'Antiga:', value: `Ao lado ⏩`},
                {name: 'Nova:', value: 'Abaixo ⏬'},
            )
            .setImage(userAvatar)
            .setFooter({text: `ID do usuário: ${userId}`})
        ;

        channel.send({
            embeds:[embed]
        });
    }
}
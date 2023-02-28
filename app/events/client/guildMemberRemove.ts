import { Client, EmbedBuilder, GuildMember, GuildTextBasedChannel } from 'discord.js';
const { channelSaidas } = require('../../helpers/globalVariables.js')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member: GuildMember, client: Client){
        const memberId = member.id;
        const memberName = member.displayName;
        const memberTag = member.user.tag;
        let memberAvatar = member.user.avatarURL();
        if(!memberAvatar){
            memberAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png'
        }
        const channel = (await client.channels.fetch(channelSaidas) as GuildTextBasedChannel);
        

        const embed = new EmbedBuilder()
            .setColor(0xf44336)
            .setTitle(`${memberName} saiu do servidor!`)
            .setAuthor({ name: `${memberTag}`, iconURL: `${memberAvatar}`})
            .setThumbnail(memberAvatar)
            .setFooter({text: `ID do usuário: ${memberId}`})


        channel.send({
            embeds: [embed]
        })

    }
}
import { Client, EmbedBuilder, GuildMember, GuildTextBasedChannel } from 'discord.js';
const { channelLogs } = require('../../helpers/globalVariables.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember: GuildMember, newMember: GuildMember, client: Client){
        if(oldMember.nickname == newMember.nickname){
            return;
        }
        
        const memberId = newMember.id;
        const memberName = newMember.nickname;
        const memberTag = newMember.user.tag;
        const channel = (await client.channels.fetch(channelLogs) as GuildTextBasedChannel);

        let oldNickname = oldMember.nickname;
        if(!oldNickname){
            oldNickname = 'Sem Apelido'
        }

        let memberAvatar = newMember.user.avatarURL();
        if(!memberAvatar){
            memberAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png'
        }


        const embed = new EmbedBuilder()
            .setColor(0x03c03c)
            .setAuthor({ name: memberTag, iconURL: memberAvatar})
            .setTitle(`O usuário ${memberTag} teve seu nickname alterado!`)
            .addFields(
                {name: 'Antigo:', value: `${oldNickname}`},
                {name: 'Novo:', value: `${memberName}`},
            )
            .setFooter({text: `ID do usuário: ${memberId}`})
        ;

        channel.send({
            embeds:[embed]
        });

    }
}
import { Client, EmbedBuilder, GuildMember, GuildTextBasedChannel } from 'discord.js';
const { channelRegras, channelComoFunciona, channelQueroParticipar, channelDesigners ,channelApenasVisitando, channelBemVindo, roleStreamerVisitante, guildId } = require('../../helpers/globalVariables.js')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member: GuildMember, client: Client){
        const memberId = member.id;
        const memberName = member.displayName;
        let memberAvatar = member.user.avatarURL();
        if(!memberAvatar){
            memberAvatar = 'https://cdn2.unrealengine.com/egs-discord-discord-s10-512x512-22ee7a1e5199.png'
        }
        const channel = (await client.channels.fetch(channelBemVindo) as GuildTextBasedChannel);
        const guild = await client.guilds.fetch(guildId);
        const role = await guild.roles.fetch(roleStreamerVisitante);
        

        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle(`${memberName} seja bem-vindo a Go Team`)
            .setAuthor({ name: 'Go Team', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail(memberAvatar)
            .setDescription(`Olá <@${memberId}>! Você acabou de entrar na Go Team Streamers.\n
            Somos uma comunidade que foi criada com o objetivo de auxiliar os streamers a evoluir não só Twitch, mas como streamer.\n
            Aqui você vai encontrar dicas, tirar suas dúvidas e participará de uma comunidade que está sempre disposta a te ajudar!`)
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Primeiros Passos', value: `Leia o canal os canais abaixo:`},
                {name: '\u200B', value: `<#${channelRegras}> - Para saber quais são as nossas regras de comportamento na comunidade!`},
                {name: '\u200B', value: `<#${channelComoFunciona}> - Para saber como funciona o nosso grupo e como podemos te ajudar!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'Tem interesse em participar da agenda?', value: `Basta ir no canal <#${channelQueroParticipar}> e clicar no botão de "Recrutamento", você será atendido por alguém da nossa STAFF!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'É Designer e quer divulgar?', value: `Pode divulgar sem problema, mas sem spam, vai no canal <#${channelDesigners}>, se estiver de acordo com as <#${channelRegras}> basta clicar no botão "Sou Designer"!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'Quer apenas ver dicas, interagir e jogar com o pessoal da comunidade?', value: `Sem problemas, todo mundo é bem-vindo, basta ir no canal, <#${channelApenasVisitando}> e clicar no botão "Visitar"!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'Nossas Redes', value:'\u200B'},
                {name: '📺', value: `[Twitch](https://www.twitch.tv/goteamstreamers)`, inline: true},
                {name: '🔥', value: `[Instagram](https://www.instagram.com/goteamstreamers)`, inline: true},
                {name: '\u200B', value: '\u200B'},
                {name: '🐦', value: `[Twitter](https://twitter.com/goteamstreamers)`, inline: true},
                {name: '🎮', value: `[Steam](https://store.steampowered.com/curator/42609717/)`, inline: true},
            )
        ;


        try {
            member.roles.add(role)
        } catch (error) {
            console.log(error)
        }

        

        channel.send({
            embeds: [embed]
        })

    }
}
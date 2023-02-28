import { Client, EmbedBuilder, Message, GuildTextBasedChannel } from 'discord.js';
const { channelLogs } = require('../../helpers/globalVariables.js')

module.exports = {
    name: 'messageDelete',
    async execute(message: Message, client: Client){
        if(message.author.bot){
            return;
        }

        const count = 1950;

        const mensagem = message.content.slice(0, count) + (message.content.length > count ? ' ...' : '');

        const channel = (await client.channels.fetch(channelLogs) as GuildTextBasedChannel);

        const embed = new EmbedBuilder()
            .setColor(0xf44336)
            .setDescription(
                `📄 Uma mensagem do <@${message.author.id}> foi **DELETADA** no canal <#${message.channelId}>.\n
                **MENSAGEM**:\n ${mensagem}`.slice(0, 4096)
            )
            .setFooter({text: `Membro: ${message.author.tag}   |   ID: ${message.author.id}`})

        ;

        channel.send({
            embeds:[embed]
        });

    }
}
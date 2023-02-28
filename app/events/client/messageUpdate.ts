import { Client, EmbedBuilder, Message, GuildTextBasedChannel } from 'discord.js';
const { channelLogs } = require('../../helpers/globalVariables.js')

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage: Message, newMessage: Message, client: Client){

        //console.log(oldMessage)

        if(oldMessage.author.bot){
            return;
        }
        if(oldMessage.content === newMessage.content) return;

        const channel = (await client.channels.fetch(channelLogs) as GuildTextBasedChannel);

        const count = 1950;

        const original = oldMessage.content.slice(0, count) + (oldMessage.content.length > count ? ' ...' : '');
        const editada = newMessage.content.slice(0, count) + (newMessage.content.length > count ? ' ...' : '');

        const embed = new EmbedBuilder()
            .setColor(0x03c03c)
            .setDescription(
                `📄 A [MENSAGEM](${newMessage.url}) do <@${newMessage.author.id}> foi **EDITADA** no canal <#${newMessage.channelId}>.\n
                **Original**:\n ${original} \n**Editada**:\n ${editada}`.slice(0, 4096)
            )
            .setFooter({text: `Membro: ${newMessage.author.tag}   |   ID: ${newMessage.author.id}`})

        ;

        channel.send({
            embeds:[embed]
        });
    }
}
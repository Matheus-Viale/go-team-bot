import { Client, ButtonInteraction, GuildTextBasedChannel, EmbedBuilder } from 'discord.js';
const { roleStreamerGoTeam, guildId, channelTranscript } = require('../../helpers/globalVariables.js');

module.exports = {
    data:{
        name: 'recrutamento-reprovado'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const twitch = interaction.message.embeds[0].fields[0].value;
        const guild = await client.guilds.fetch(guildId);
        const aprovadorUser = interaction.user.username;
        const memberId = interaction.message.embeds[1].footer.text.split('/')[0]
        const channelTicketId = interaction.message.embeds[1].footer.text.split('/')[1]
        const messageStaff = (interaction.message as any);
        messageStaff.embeds[0].data.title = 'Recrutamento REPROVADO';
        messageStaff.embeds[0].data.color = 0xf44336;
        messageStaff.embeds[1].data.color = 0xf44336;
        messageStaff.embeds[1].footer.text = `${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString('pt-BR')}`;


        const chanelTicketFetch = await guild.channels.fetch(channelTicketId).catch(async (error) =>{
            await interaction.message.delete();
            await interaction.editReply({
                content: `O ticket já foi fechado, você pode ver o relatório no canal <#${channelTranscript}>`
            })
        });

        const embedTicket = new EmbedBuilder()
            .setColor(0xf44336)
            .setTitle(`${twitch}, seu recrutamento foi reprovado!`)
            .setDescription(`Os motivos podem ser um dos abaixo!`)
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name:`Recusou?`, value:'Você não estava de acordo com as nossas regras e nossa maneira de trabalhar!'},
                { name: '\u200B', value: '\u200B' },
                { name:`Quebrou regras?`, value:'Você quebrou alguma regra do grupo!'},
                { name: '\u200B', value: '\u200B' },
                { name:`Houve um erro?`, value:'Se você acredita que houve um engano, envie uma mensagem abaixo, você tem o prazo de 24h para contestar essa decisão.'},
                
            )
        ;

        (chanelTicketFetch as GuildTextBasedChannel).send({
            content: `<@${memberId}>`,
            embeds:[embedTicket]
        });

        await interaction.update({
            content: `${aprovadorUser} reprovou o recrutamento de ${twitch}!`,
            embeds: messageStaff.embeds,
            components:[]
        })
        
    }
}
import { Client, ButtonInteraction, GuildTextBasedChannel, EmbedBuilder } from 'discord.js';
const { roleStreamerGoTeam, roleStreamerTwitch, roleStreamerVisitante, guildId, channelTranscript, channelPrimeirosPassos, channelDuvidasAgenda, channelTicketSuporte} = require('../../helpers/globalVariables.js');

module.exports = {
    data:{
        name: 'recrutamento-aprovado'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        const twitch = interaction.message.embeds[0].fields[0].value;
        const guild = await client.guilds.fetch(guildId);
        const aprovadorUser = interaction.user.username;
        const memberId = interaction.message.embeds[1].footer.text.split('/')[0]
        const channelTicketId = interaction.message.embeds[1].footer.text.split('/')[1]
        const memberTicket = await guild.members.fetch(memberId);
        const roleStreamerGoTeamFetch = await guild.roles.fetch(roleStreamerGoTeam);
        const roleStreamerTwitchFetch = await guild.roles.fetch(roleStreamerTwitch);
        const roleStreamerVisitanteFetch = await guild.roles.fetch(roleStreamerVisitante);
        const messageStaff = (interaction.message as any);
        messageStaff.embeds[0].data.title = 'Recrutamento APROVADO';
        messageStaff.embeds[0].data.color = 0x03c03c;
        messageStaff.embeds[1].data.color = 0x03c03c;
        messageStaff.embeds[1].footer.text = `${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString('pt-BR')}`;


        const chanelTicketFetch = await guild.channels.fetch(channelTicketId).catch(async (error) =>{
            await interaction.message.delete();
            await interaction.reply({
                content: `O ticket já foi fechado, você pode ver o relatório no canal <#${channelTranscript}>`,
                ephemeral: true
            })
        });

        
        try {
            await memberTicket.roles.add(roleStreamerGoTeamFetch);
            await memberTicket.roles.add(roleStreamerTwitchFetch);
            await memberTicket.roles.remove(roleStreamerVisitanteFetch);
            await memberTicket.setNickname(`twitch.tv/${twitch}`);
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content:'Houve um erro ao aprovar o recrutamento, a descrição está no console.',
                ephemeral: true
            });
            return;
        }
        

        const embedTicket = new EmbedBuilder()
            .setColor(0x03c03c)
            .setTitle(`${twitch}, seu recrutamento foi aprovado!`)
            .setDescription(`Tudo certo, agora basta ir no canal <#${channelPrimeirosPassos}>, lá você irá encontrar tudo que precisa para começar!\n\nE se ficar qualquer dúvida basta perguntar no canal <#${channelDuvidasAgenda}> ou abrir um ticket no canal <#${channelTicketSuporte}>!\n\nSe tudo ficou entendido basta mandar um ok novamente e iremos encerrar o seu ticket de recrutamento, caso queira, pode aproveitar para tirar suas dúvidas aqui!`)
        ;

        (chanelTicketFetch as GuildTextBasedChannel).send({
            content: `<@${memberId}>`,
            embeds:[embedTicket]
        });

        await interaction.update({
            content: `${aprovadorUser} aprovou o recrutamento de ${twitch}!`,
            embeds: messageStaff.embeds,
            components:[]
        })
        
    }
}
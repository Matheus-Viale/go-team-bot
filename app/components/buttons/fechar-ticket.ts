import { Client, ButtonInteraction, GuildMember, EmbedBuilder, GuildTextBasedChannel } from 'discord.js';
import { createTranscript, ExportReturnType } from 'discord-html-transcripts';
const { channelTranscript, roleOpenTicket, roleRecrutador } = require('../../helpers/globalVariables.js')

module.exports = {
    data:{
        name: 'fechar-ticket'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const { guild, channel, message } = interaction;
        const member = (interaction.member as GuildMember);
        const memberTicketId = message.embeds[0].footer.text.split(': ')[1]
        const roleOpenTicketFetch = await guild.roles.fetch(roleOpenTicket)
        const channelTranscriptFetch = (await guild.channels.fetch(channelTranscript) as GuildTextBasedChannel);
        const tagNumber = member.user.tag.split('#')[1];
        const dateString = `${new Date().toLocaleDateString('pt-BR')}`;
        

        if(!member.roles.cache.get(roleRecrutador)){
            
            await interaction.editReply({
                content: `Você não tem permissão para fechar o ticket!`
            });
            
            return;
        }

        //TRANSCRIPT
        const transcript = await createTranscript(channel,
            {
                limit: -1,
                returnType: ExportReturnType.Attachment,
                filename: `ticket-${member.user.username}-${tagNumber}-${dateString}.html`
            }    
        );
        

        //EMBED
        const embed = new EmbedBuilder()    
            .setTitle(`${channel.name} Fechado`)
            .addFields(
                {name: 'Criador do Ticket', value: `<@${memberTicketId}>`},
                {name: 'Fechou o Ticket', value: `<@${member.id}>`},
                {name: 'Data de fechamento do Ticket', value: `${dateString}`},
            )
        ;
            


        channelTranscriptFetch.send({
            embeds:[embed],
            files:[transcript]
        }).catch(error =>{
            console.log(error)
            interaction.editReply({
                content: 'Houve um erro e não consegui enviar a transcrição, favor entrar em contato com a STAFF'
            })
            return;
        })

        try {
            member.roles.remove(roleOpenTicketFetch)
        } catch (error) {
            console.log(error)
            interaction.editReply({
                content: `Houve um erro e não foi possível remover o usuário <@${member.displayName}> do cargo openTicket, favor entrar em contato com a STAFF`
            })
            return;
        }

        try {
            channel.delete()
        } catch (error) {
            console.log(error)
            interaction.editReply({
                content: `Houve um erro e não foi possível remover o canal <#${channel.name}>, favor entrar em contato com a STAFF`
            })
            return;
        }
    }
}
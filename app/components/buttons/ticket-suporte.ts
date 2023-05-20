import { Client, ButtonInteraction, ActionRowBuilder, EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType, GuildMember } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleStreamerGoTeam, roleOpenTicket, categoryTickets, roleEveryone, roleRecrutador } = require('../../helpers/globalVariables.js');

module.exports = {
    data:{
        name: 'ticket-suporte'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const { guild } = interaction;
        const member = (interaction.member as GuildMember);
        const { ViewChannel, SendMessages, ReadMessageHistory} = PermissionFlagsBits
        const memberTagNumber = member.user.tag.split('#')[1];
        const roleOpenTicketFetch = await guild.roles.fetch(roleOpenTicket);

        if(!await verifyUserRoles(member, roleStreamerGoTeam)){
            await interaction.editReply({
                content: 'Você não tem permissão para usar esse recurso!'
            })
            return;
        }
        
        if(await verifyUserRoles(member, roleOpenTicket)){
            await interaction.editReply({
                content: `Você já possui um ticket em aberto`
            });
            return;
        }
        
        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({name: member.user.tag, iconURL: await member.user.avatarURL()})
            .setTitle(`Suporte para ${member.user.username}`)
            .setDescription('Descreva abaixo seu problema, sugestão ou dúvida:')
            .addFields(
                { name: '\u200B', value: '\u200B' },
            )
            .setFooter({text: `ID do Usuário: ${member.id}`})
        ;

        const buttonFechar = new ButtonBuilder()
            .setCustomId('fechar-ticket')
            .setEmoji('🔒')
            .setLabel('Fechar Ticket')
            .setStyle(ButtonStyle.Danger)
        ;

        await guild.channels.create({
            name: `ticket-${member.user.username}-${memberTagNumber}`,
            type: ChannelType.GuildText,
            parent: categoryTickets,
            permissionOverwrites:[
                {
                    id: roleEveryone,
                    deny: [ViewChannel, SendMessages, ReadMessageHistory]
                },
                {
                    id: member.id,
                    allow: [ViewChannel, SendMessages, ReadMessageHistory]
                },
                {
                    id: roleRecrutador,
                    allow: [ViewChannel, SendMessages, ReadMessageHistory]
                }
            ]
        }).then(async (channel)=>{
            member.roles.add(roleOpenTicketFetch);
            channel.send({
                embeds:[embed],
                components: [new ActionRowBuilder().addComponents([buttonFechar])] as any
            })
            await interaction.editReply({
                content: `Seu ticket foi criado no canal <#${channel.id}>`
            })
        }).catch(async (error)=>{
            console.log(error)
            await interaction.editReply({
                content: 'Houve um erro e não foi possível criar o ticket de recrutamento! Entre em contato com a STAFF!'
            })
            return;
        })


    }
}
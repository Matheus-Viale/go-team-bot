import { Client, ButtonInteraction, GuildTextBasedChannel, EmbedBuilder } from 'discord.js';
import agendaSolicitacaoAprovada from '../../helpers/agendaSolicitacaoAprovada';
const { channelMarcarTwitch, channelNotificacoesStreamer } = require('../../helpers/globalVariables.js');

module.exports = {
    data:{
        name: 'solicitacao-aprovada'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const channelNotificacoesFetch = (await client.channels.fetch(channelNotificacoesStreamer) as GuildTextBasedChannel);
        const aprovadorUser = interaction.user.username;
        const footerText = interaction.message.embeds[0].data.footer.text;
        const streamerId = footerText.split('/')[0];
        const messageUserId = footerText.split('/')[1];
        const streamerTwitch = interaction.message.embeds[0].data.title;
        const streamerNick = streamerTwitch.split('/')[1];
        const messageStaff = (interaction.message as any);
        const channel = (await client.channels.fetch(channelMarcarTwitch) as GuildTextBasedChannel);
        const messageUser = (await channel.messages.fetch(messageUserId) as any);
        const streamerUser = await client.users.fetch(streamerId);
        const dia = interaction.message.embeds[0].data.fields[1].value;
        const horario = interaction.message.embeds[0].data.fields[2].value;


        const statusAgendamento = await agendaSolicitacaoAprovada(streamerId, streamerTwitch, dia, horario, client);

        if(statusAgendamento == 'INVALIDO'){
            await interaction.editReply({
                content:`Não foi possível realizar o agendamento pois o dia ${dia}, não é valido para agendamentos hoje!`
            })
            return;
        }

        if(statusAgendamento == 'OCUPADO'){
            await interaction.editReply({
                content:`Não foi possível realizar o agendamento pois o dia ${dia} no horário das ${horario}, já está preenchido!`
            })
            return;
        }

        if(statusAgendamento == 'SUCESSO'){
            messageStaff.embeds[0].data.author.name = 'Solicitação APROVADA';
            messageStaff.embeds[0].data.color = 0x03c03c;
            messageUser.embeds[0].data.color = 0x03c03c;
            
            await interaction.update({
                content: `${aprovadorUser} aprovou a live de ${streamerTwitch}, para ${dia} às ${horario}`,
                embeds: messageStaff.embeds,
                components:[]
            })

            const embed = new EmbedBuilder()
                .setColor(0x03c03c)
                .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
                .setTitle('Solicitação de agendamento aprovada!')
                .setDescription(`${streamerNick}, o seu agendamento para ${dia} às ${horario}(BR) foi aprovado!\nNão esqueça, caso não consiga realizar a live você pode avisar com até uma hora de antecedência!`)
            ;

            streamerUser.send({
                embeds:[embed]
            }).catch(error =>{
                channelNotificacoesFetch.send({
                    content: `<@${streamerId}>`,
                    embeds:[embed]
                })
            })

            messageUser.edit({
                embeds: messageUser.embeds
            })

            messageStaff.react('✅')
            
            messageUser.react('✅')
            
        }


        
    }
}
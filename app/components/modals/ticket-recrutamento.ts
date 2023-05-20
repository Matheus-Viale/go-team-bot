import { Client, ModalSubmitInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ChannelType, PermissionFlagsBits, GuildMember, GuildTextBasedChannel } from 'discord.js';
import verifyUserIsOnlineTwitch from "../../helpers/verifyUserIsOnlineTwitch";
const { channelRecrutados, categoryTickets, roleEveryone, roleRecrutador, channelComoFunciona, channelRegras, roleOpenTicket } = require('../../helpers/globalVariables.js');


module.exports = {
    data: {
        name:'ticket-recrutamento'
    },
    async execute(interaction: ModalSubmitInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})

        //INFOS DO MODAL
        const { guild } = interaction;
        const member = (interaction.member as GuildMember)
        const { ViewChannel, SendMessages, ReadMessageHistory } = PermissionFlagsBits
        const memberTagNumber = member.user.tag.split('#')[1];
        const nomeTwitch = interaction.fields.getTextInputValue('nomeTwitch');
        const afiliadoTwitch = interaction.fields.getTextInputValue('afiliadoTwitch');
        const tempoLive = interaction.fields.getTextInputValue('tempoLive');
        const objetivo = interaction.fields.getTextInputValue('objetivo');
        const recomendacao = interaction.fields.getTextInputValue('recomendacao');

        if(await verifyUserIsOnlineTwitch(nomeTwitch) == 'inexistente'){
            await interaction.editReply({
                content:`O canal ${nomeTwitch} não foi encontrado, verifique se está correto!`
            });
            return;
        }

        //INFOS DO CLIENT OU GUILD
        const channelRecrutadosFetch = (await client.channels.fetch(channelRecrutados) as GuildTextBasedChannel);
        const roleOpenTicketFetch = await guild.roles.fetch(roleOpenTicket);
        let channelTicketId;

        try {
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
            }).then(async (channel) =>{
                const embedTicket1 = new EmbedBuilder()
                    .setColor(0x6441A5)
                    .setAuthor({name: 'Go Team Streamers', iconURL:'https://i.imgur.com/j1yOXKJ.png'})
                    .setTitle(`Recrutamento de ${member.displayName}`)
                    .setDescription(`Ficamos felizes em saber que você tem interesse em fazer parte da nossa equipe, agora vamos passar algumas instruções e confirmar as informações!\n\n`)
                    .addFields(
                        {name:'Usuário:', value: `<@${member.id}>`},
                        {name:'Canal informado:', value: `${nomeTwitch}`},
                        {name:'Já é afiliado:', value: `${afiliadoTwitch}`},
                        {name:'Tempo com Streamer:', value: `${tempoLive}`},
                        { name: '\u200B', value: 'Se alguma das suas informações estiverem incorretas, basta avisar aqui no chat que fecharemos o seu ticket e você poderá abrir um novo!' },
                        { name: '\u200B', value: '\u200B' },
                    )
                    .setFooter({text:`ID do Usuário: ${member.id}`})
                ;

                const embedTicket2 = new EmbedBuilder()
                        .setColor(0x6441A5)
                        .setTitle('Pequeno Resumo')
                        .setDescription(`Esperamos que você já tenha lido nossos dois canais introdutórios <#${channelComoFunciona}> e <#${channelRegras}>, caso ainda não tenha lido, agora é uma boa hora pra ir e não ficar com nenhuma dúvida! De qualquer maneira abaixo tem um pequeno resumo de como funciona a agenda.`)
                        .addFields(
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Configuração de Privacidade', value: 'Eu, o bot da Go Team converso diretamente com vocês streamers, então por gentileza, nas opções na seta ao lado do nome do server na parte superior do discord, vá em Config de Privacidade e habilite "Mensagens Diretas", para que eu consiga te notificar sobre suas solicitações e seus agendamentos. (Não se preocupe, eu não faço nenhum tipo de SPAM)' },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Como Funciona:', value: `Nosso grupo funciona com agendamento e acompanhamento de lives. Todo dia tem uma agenda com streamers diferentes e você tem que acompanhar ou deixar em "lurk" as lives para poder agendar a sua.\n\nOs horários da nossa agenda são de 2 horas.`},
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Nossos horários:', value: 'As lives acontecem todos os dias das **10:00** às **00:00**, conforme os horários abaixo:\n\n10:00 às 12:00\n12:00 às 14:00\n14:00 às 16:00\n16:00 às 18:00\n18:00 às 20:00\n20:00 às 22:00\n22:00 às 00:00' },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Como agendar:', value: 'A agenda abre todos os dias às **12:00** e fecha às **21:00**, com os agendamentos sempre para o dia seguinte.'},
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Requisitos para agendar:', value:'A única coisa que exigimos obrigatoriamente é acompanhar ou deixar em "lurk" as lives, temos uma lista de presença que usamos para saber quem está colaborando!'},
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Você concorda?', value: 'Caso esteja de acordo em participar e colaborar com o grupo, acompanhando as lives dos colegas basta responder com OK e iremos lhe guiar sobre como acompanhar as lives e agendar, além de verificar sua presença e justificar caso precise se ausentar.' },
                            { name: '\u200B', value: '\u200B' },
                            { name: 'Dúvidas?', value: 'Caso queira tirar qualquer dúvida antes de aceitar, basta perguntar aqui no chat e algum recrutador irá lhe responder assim que possível!' },
                        )
                ;

                const buttonFechar = new ButtonBuilder()
                    .setCustomId('fechar-ticket')
                    .setEmoji('🔒')
                    .setLabel('Fechar Ticket')
                    .setStyle(ButtonStyle.Danger)
                ;

                channelTicketId = await channel.id

                await member.roles.add(roleOpenTicketFetch);

                await channel.send({
                    embeds:[embedTicket1],
                    components:[new ActionRowBuilder().addComponents([buttonFechar])] as any
                })
                await channel.send({
                    embeds:[embedTicket2]
                })
            })
        } catch (error) {
            console.log(error)
            await interaction.editReply({
                content: 'Houve um erro e não foi possível criar o ticket de recrutamento! Entre em contato com a STAFF!'
            })
            return;
        }

        //EMBED

        const embedRecrutados1 = new EmbedBuilder()
            .setColor(0x6441A5)
            .setAuthor({name: member.user.tag, iconURL: await member.user.avatarURL()})
            .setTitle(`Recrutamento de ${member.user.username}`)
            .addFields(
                {name: 'Canal da Twitch:', value: `${nomeTwitch}`},
                {name: 'Afiliado:', value: `${afiliadoTwitch}`},
                {name: 'Tempo de Streamer:', value: `${tempoLive}`},
                {name: 'Recomendação:', value: `${recomendacao}`},
            )
        ;

        const embedRecrutados2 = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle('Objetivo:')
            .setDescription(objetivo)
            .addFields(
                { name: '\u200B', value: '\u200B' },
            )
            .setFooter({text: `${member.id}/${channelTicketId}`})
        ;

        //BOTÕES
        const buttonAprovado = new ButtonBuilder()
            .setCustomId('recrutamento-aprovado')
            .setLabel('Aprovado')
            .setStyle(ButtonStyle.Success)
        ;
        const buttonReprovado = new ButtonBuilder()
            .setCustomId('recrutamento-reprovado')
            .setLabel('Reprovado')
            .setStyle(ButtonStyle.Danger)
        ;

        await channelRecrutadosFetch.send({
            embeds:[embedRecrutados1, embedRecrutados2],
            components: [new ActionRowBuilder().addComponents([buttonAprovado, buttonReprovado])] as any
        });
       

        await interaction.editReply({
            content: 'Ticket de recrutamento criado com sucesso!'
        })
    }
}
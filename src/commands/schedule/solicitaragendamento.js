const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { verificaMediaPresenca } = require('../../helpers/attendance/verificaMediaPresenca.js');
const {roleStreamerGoTeam, channelSolicitacaoAgendamentosStaff, channelMarcarTwitch} = require('../../helpers/globalVariables.js');
const {verifyUserRoles} = require('../../helpers/verifyUserRoles.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('solicitaragendamento')
        .setDescription('Solicita um agendamento!')
        .addIntegerOption((option) => 
            option
                .setName('horario')
                .setDescription('Qual horário você deseja fazer a live?')
                .setChoices(
                    {name: '10:00', value: 10 },
                    {name: '12:00', value: 12 },
                    {name: '14:00', value: 13 },
                    {name: '16:00', value: 16 },
                    {name: '18:00', value: 28 },
                    {name: '20:00', value: 20 },
                    {name: '22:00', value: 22 },
                )
                .setRequired(true)
        )
        .addStringOption((option) => 
            option
                .setName('dia')
                .setDescription('Qual dia da semana você deseja agendar?')
                .setChoices(
                    {name: 'Domingo', value: 'Domingo'},
                    {name: 'Segunda', value: 'Segunda-Feira'},
                    {name: 'Terça', value: 'Terça-Feira'},
                    {name: 'Quarta', value: 'Quarta-Feira'},
                    {name: 'Quinta', value: 'Quinta-Feira'},
                    {name: 'Sexta', value: 'Sexta-Feira'},
                    {name: 'Sábado', value: 'Sábado'},
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
                option
                    .setName('preenchimento')
                    .setDescription('MARCAR SIM APENAS COM AUTORIZAÇÃO DA STAFF!')
                    .setChoices(
                        {name: 'SIM', value: 'sim'}
                    )
        )

    
    ,
    async execute(interaction, client){

        if(!await verifyUserRoles(interaction.member, roleStreamerGoTeam)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }

        const streamer = await interaction.member;
        const streamerNickname = streamer.displayName;
        const streamerAvatar = streamer.user.avatarURL();

        if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
            interaction.reply({
                content: 'Seu nome não está no padrão twitch.tv/NickTwitch, solicite a alguém da STAFF para alterar antes de agendar!',
                ephemeral: true
            });
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const dia = await interaction.options.getString('dia');
        const horario = await interaction.options.getInteger('horario');
        const horarioString = horario + ':00';
        const preenchimento = await interaction.options.getString('preenchimento');
        const horaSolicitacao = new Date().getUTCHours();

        if(preenchimento != 'sim' && horaSolicitacao < 15 || horaSolicitacao > 21){
            await interaction.reply({
                content: 'O horário de agendamento é das 12:00 às 18:00 (Horário de Brasilia) ou 15:00 às 21:00 (Horário de Lisboa), caso a STAFF tenha solicitado, marcar a opção SIM em preenchimento',
                ephemeral: true
            });
            return;
        }

        const embedUser = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle(streamerNickname)
            .setAuthor({ name: 'Solicitação de Agendamento', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail(streamerAvatar)
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Dia', value: dia, inline: true},
                {name: 'Horário', value: horarioString, inline: true},
            )
        ;

        
        const channelStaff = client.channels.cache.get(channelSolicitacaoAgendamentosStaff);
        const channelMarcarTwitchFetch = client.channels.cache.get(channelMarcarTwitch);
        const messageUser = await channelMarcarTwitchFetch.send({
            embeds: [embedUser]
        })
        const messageId = await messageUser.id

        const presenca7Dias = await verificaMediaPresenca(7, streamerTwitch);
        const presenca14Dias = await verificaMediaPresenca(14, streamerTwitch);

        const buttonAprovar = new ButtonBuilder()
            .setCustomId('solicitacao-aprovada')
            .setLabel('✅')
            .setStyle(ButtonStyle.Secondary)
        ;
        const buttonCancelar = new ButtonBuilder()
            .setCustomId('solicitacao-cancelada')
            .setLabel('🏳️')
            .setStyle(ButtonStyle.Secondary)
        ;
        const buttonReprovarPresenca = new ButtonBuilder()
            .setCustomId('solicitacao-reprovada-presenca')
            .setEmoji('🚫')
            .setStyle(ButtonStyle.Secondary)
        ;
        const buttonReprovarAdvertencia = new ButtonBuilder()
            .setCustomId('solicitacao-reprovada-advertencia')
            .setEmoji('⚠️')
            .setStyle(ButtonStyle.Secondary)
        ;
        const buttonReprovarPrioridade = new ButtonBuilder()
            .setCustomId('solicitacao-reprovada-prioridade')
            .setEmoji('⛔')
            .setStyle(ButtonStyle.Secondary)
        ;
        const embedStaff = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle(streamerNickname)
            .setAuthor({ name: 'Solicitação de Agendamento', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail(streamerAvatar)
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Dia', value: dia, inline: true},
                {name: 'Horário', value: horarioString, inline: true},
                {name: '\u200B', value: '\u200B'},
                {name: 'Média de Presença 7 Dias', value: presenca7Dias.mediaPresenca},
                {name: '\u200B', value: '\u200B'},
                {name: 'Média de Presença 14 Dias', value: presenca14Dias.mediaPresenca},
                {name: '\u200B', value: '\u200B'}
            )
            .setFooter({text: interaction.member.id + '/' + messageId, iconURL: streamerAvatar})
        ;

        await channelStaff.send({
            components: [
                new ActionRowBuilder().addComponents([buttonReprovarPresenca, buttonReprovarAdvertencia, buttonReprovarPrioridade, buttonCancelar]),
                new ActionRowBuilder().addComponents([buttonAprovar])
            ],
            embeds: [embedStaff]
        })

        
        let messageContent = 'Solicitação de agendamento criada com sucesso!';
        await streamer.send({
            content: `${streamerTwitch} o seu agendamento para ${dia} às ${horario}:00(BR) foi enviado para análise, após as 18:00(BR)/21:00(PT) você receberá aqui o retorno do seu agendamento!`
        }).catch(error =>{
            messageContent = messageContent + '\nFavor ir nas configurações de privacidade do servidor e habilitar "Mensagens diretas" para o bot conseguir mandar as notificações para você! (Não se preocupe, não fazemos SPAM)'
        })

        await interaction.reply({
            content: messageContent,
            ephemeral: true
        })
        
    }
}
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {verificaMediaPresenca} = require('../../helpers/attendance/verificaMediaPresenca.js');
const {verifyUserRoles} = require('../../helpers/verifyUserRoles.js');
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js')




module.exports = {
    data: new SlashCommandBuilder()
        .setName('consultapresenca')
        .setDescription('Retorna as informações sobre sua presença nas lives!')
        .addIntegerOption((option) => 
                option
                    .setName('periodo')
                    .setDescription('Consultar a sua presença em qual período?')
                    .setChoices(
                        {name: 'Uma Semana', value: 7 },
                        {name: 'Duas Semanas', value: 1 },
                    )
                    .setRequired(true)
            )
    ,
    async execute(interaction, client){
        
        const streamer = await interaction.member;
        if(!await verifyUserRoles(streamer, roleStreamerGoTeam)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }

        
        const streamerNickname = streamer.displayName;

        if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
            interaction.reply({
                content: 'Seu nome não está no padrão twitch.tv/NickTwitch, solicite a alguém da STAFF para alterar antes de agendar!',
                ephemeral: true
            });
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const periodo = await interaction.options.getInteger('periodo');

        const presencaInfo = await verificaMediaPresenca(periodo, streamerTwitch);

        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle(`SUA PRESENÇA NOS ÚLTIMOS ${periodo} DIAS`)
            .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Sua média', value: `Você esteve presente em ${presencaInfo.mediaPresenca} das lives!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'Total de Lives', value: `Nos últimos ${periodo} dias houveram ${presencaInfo.totalLives} lives!`},
                {name: '\u200B', value: `\u200B`},
                {name: 'Sua Presença', value: `Você estava presente em ${presencaInfo.presenca} lives!`},
                {name: '\u200B', value: `\u200B`},
                {name: 'Justificativa?', value: `Caso você tenha se ausentado por algum motivo importante, deixe sua justificativa através do comando "/justificativafalta" e iremos considerar na hora das suas solicitações`},
            )
        ;

        streamer.send({
            embeds: [embed]
        }).then(result =>{
            interaction.reply({
                content:'Suas informações de presença estão na sua DM',
                ephemeral: true
            })
        }).catch(error =>{
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        })


    }
}
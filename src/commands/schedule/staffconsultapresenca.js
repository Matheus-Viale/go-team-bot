const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {verificaMediaPresenca} = require('../../helpers/attendance/verificaMediaPresenca.js');
const {verifyUserRoles} = require('../../helpers/verifyUserRoles.js');
const { roleResponsavelTwitch, guildId } = require('../../helpers/globalVariables.js')




module.exports = {
    data: new SlashCommandBuilder()
        .setName('staffconsultapresenca')
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
        .addUserOption((option) => 
            option
                .setName('streamer')
                .setDescription('Qual Streamer você deseja consultar a presença?')
        )
    ,
    async execute(interaction, client){
        
        
        if(!await verifyUserRoles(await interaction.member, roleResponsavelTwitch)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }


        const streamer = await interaction.options.getUser('streamer');
        const streamerId = streamer.id
        const guild = await client.guilds.fetch(guildId);
        const streamerMember = await guild.members.fetch(streamerId)
        const streamerNickname = streamerMember.displayName;

        if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
            interaction.reply({
                content: `O nome ${streamerNickname} não está no padrão twitch.tv/NickTwitch, altere antes de consultar!`,
                ephemeral: true
            });
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const periodo = await interaction.options.getInteger('periodo');

        const presencaInfo = await verificaMediaPresenca(periodo, streamerTwitch);

        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle(`PRESENÇA DE ${streamerTwitch} NOS ÚLTIMOS ${periodo} DIAS`)
            .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Média', value: `${streamerTwitch} esteve presente em ${presencaInfo.mediaPresenca} das lives!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'Total de Lives', value: `Nos últimos ${periodo} dias houveram ${presencaInfo.totalLives} lives!`},
                {name: '\u200B', value: `\u200B`},
                {name: 'Presença', value: `${streamerTwitch} estava presente em ${presencaInfo.presenca} lives!`},
            )
        ;

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        })


    }
}
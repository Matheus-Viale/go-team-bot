import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, GuildMember } from 'discord.js';
import verificaMediaPresenca  from '../../helpers/attendance/verificaMediaPresenca.js';
import verifyUserRoles  from '../../helpers/verifyUserRoles.js';
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js')




module.exports = {
    data: new SlashCommandBuilder()
        .setName('staffconsultapresenca')
        .setDescription('Retorna as informações sobre presença nas lives! [STAFF]')
        .addIntegerOption((option) => 
                option
                    .setName('periodo')
                    .setDescription('Consultar a presença em qual período?')
                    .setChoices(
                        {name: 'Um Dia', value: 1 },
                        {name: 'Três Dias', value: 3 },
                        {name: 'Uma Semana', value: 7 },
                        {name: 'Duas Semanas', value: 14 },
                    )
                    .setRequired(true)
        )
        .addUserOption((option) => 
            option
                .setName('streamer')
                .setDescription('Qual Streamer você deseja consultar a presença?')
                .setRequired(true)
        )
    ,
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const member = (interaction.member as GuildMember);
        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }


        const streamer = interaction.options.getUser('streamer');
        const streamerId = streamer.id
        const {guild} = interaction;
        const streamerMember = await guild.members.fetch(streamerId)
        const streamerNickname = streamerMember.displayName;

        if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
            interaction.editReply({
                content: `O nome ${streamerNickname} não está no padrão twitch.tv/NickTwitch, altere antes de consultar!`
            });
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const periodo = await interaction.options.getInteger('periodo');

        const presencaInfo = await verificaMediaPresenca(periodo, streamerTwitch);

        const embed = new EmbedBuilder()
            .setColor(0x6441A5)
            .setTitle(`PRESENÇA DE ${streamerTwitch.toUpperCase()} NOS ÚLTIMOS ${periodo} DIAS`)
            .setAuthor({ name: 'GO TEAM STREAMERS', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Média', value: `<@${streamerId}> esteve presente em ${presencaInfo.mediaPresenca} das verificações de das lives!`},
                {name: '\u200B', value: '\u200B'},
                {name: 'Total de Lives', value: `Nos últimos ${periodo} dias houveram ${presencaInfo.totalLives} verificações de lives!`},
                {name: '\u200B', value: `\u200B`},
                {name: 'Presença', value: `<@${streamerId}> estava presente em ${presencaInfo.presenca} verificações de lives!`},
            )
        ;

        interaction.editReply({
            embeds: [embed]
        })


    }
}
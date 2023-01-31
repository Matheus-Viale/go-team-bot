const { EmbedBuilder } = require('discord.js');
const { channelJustificativaFaltaStaff, roleResponsavelTwitch, roleStreamerGoTeam } = require('../../helpers/globalVariables.js');

module.exports = {
    data: {
        name:'justificativa-falta'
    },
    async execute(interaction, client){
        const streamer = await interaction.member;
        const streamerNickname = streamer.nickname;
        const streamerAvatar = streamer.user.avatarURL();
        const channel = await client.channels.cache.get(channelJustificativaFaltaStaff);
        const justificativaFalta = await interaction.fields.getTextInputValue('justificativaFaltaInput');
        const dateString = new Date().toLocaleDateString();
        const timeString = new Date().toLocaleTimeString();

        const embed = new EmbedBuilder()
            .setColor(0xdaa520)
            .setTitle(streamerNickname)
            .setAuthor({ name: 'Justificativa de Falta', iconURL: 'https://i.imgur.com/j1yOXKJ.png'})
            .setThumbnail(streamerAvatar)
            .addFields(
                {name: '\u200B', value: '\u200B'},
                {name: 'Justificativa', value: justificativaFalta},
                {name: '\u200B', value: '\u200B'}
            )
            .setFooter({text: dateString + '/' + timeString})

        await channel.send({
            content: `<@&${roleResponsavelTwitch}>`,
            embeds: [embed]
        });

        await interaction.reply({
            content: `${streamerNickname}, sua justificativa de falta foi enviada para staff, agradecemos o aviso!`,
            ephemeral: true
        })
    }
}
import { Client, EmbedBuilder, GuildMember, ModalSubmitInteraction, GuildTextBasedChannel } from 'discord.js';
const { channelJustificativaFaltaStaff, roleResponsavelTwitch } = require('../../helpers/globalVariables.js');

module.exports = {
    data: {
        name:'justificativa-falta'
    },
    async execute(interaction: ModalSubmitInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const streamer = (interaction.member as GuildMember);
        const streamerNickname = streamer.nickname;
        const streamerAvatar = streamer.user.avatarURL();
        const channel = (await client.channels.fetch(channelJustificativaFaltaStaff) as GuildTextBasedChannel);
        const justificativaFalta = interaction.fields.getTextInputValue('justificativaFaltaInput');
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
            .setFooter({text: dateString + ' - ' + timeString})

        await channel.send({
            content: `<@&${roleResponsavelTwitch}>`,
            embeds: [embed]
        });

        await interaction.editReply({
            content: `${streamerNickname}, sua justificativa de falta foi enviada para staff, agradecemos o aviso!`
        })
    }
}
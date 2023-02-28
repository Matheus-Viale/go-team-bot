import { Client, ButtonInteraction, GuildMember} from 'discord.js'
const { roleStreamerTwitch, channelQueroParticipar, guildId } = require('../../helpers/globalVariables.js')

module.exports = {
    data:{
        name: 'apenas-visitando'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const guild = await client.guilds.fetch(guildId);
        const role = await guild.roles.fetch(roleStreamerTwitch);
        const member = (interaction.member as GuildMember);

        member.roles.add(role);

        await interaction.editReply({
            content: `Olá ${member.displayName}, agora você pode interagir com o pessoal no servidor, fique a vontade mas não esqueça das regras!\n
                Caso mude de ideia e queira participar da agenda, basta ir no canal <#${channelQueroParticipar}> e abrir o seu ticket de recrutamento.\n
                Boa sorte na sua jornada e boas lives!`
        });
    }
}
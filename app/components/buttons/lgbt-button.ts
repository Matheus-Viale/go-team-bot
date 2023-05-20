import { Client, ButtonInteraction, GuildMember } from 'discord.js';
const { roleLGBT, guildId } = require('../../helpers/globalVariables.js')

module.exports = {
    data:{
        name: 'lgbt-button'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const member = (interaction.member as GuildMember);

        if(member.roles.cache.get(roleLGBT)){
            
            await interaction.editReply({
                content: `Você já faz parte do grupo LGBT+`
            });
            
            return;
        }


        const guild = await client.guilds.fetch(guildId);
        const role = await guild.roles.fetch(roleLGBT);
        
        const memberNickname = member.displayName;

        try {
            member.roles.add(role).catch(console.error);
            member.setNickname('🌈' + memberNickname).catch(console.error);
        } catch (error) {
            console.log(error)
        }
        

        await interaction.editReply({
            content: `Olá, agora você tem acesso aos canais exclusivos para a comunidade LGBT+, fique a vontade mas não esqueça das regras!\nSe encontrar qualquer coisa de errado, ou alguém que não deveria esteja no grupo de vocês, basta abrir um ticket que iremos investigar!\nBoa sorte na sua jornada e boas lives!`
        });
    }
}
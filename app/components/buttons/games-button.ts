import { Client, ButtonInteraction, GuildMember, ButtonComponent } from 'discord.js';
const { rolesGames, guildId } = require('../../helpers/globalVariables.js')

module.exports = {
    data:{
        name: 'games-button'
    },
    async execute(interaction: ButtonInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const { guild } = interaction;
        const component = (interaction.component as ButtonComponent)
        const member = (interaction.member as GuildMember);
        const grupoName = component.data.label.toLowerCase();
        const roleSelect = rolesGames[grupoName];

        if(member.roles.cache.get(roleSelect)){
            
            await interaction.editReply({
                content: `Você já faz parte do grupo ${grupoName}`
            });
            
            return;
        }


        
        const role = await guild.roles.fetch(roleSelect);
        

        try {
            member.roles.add(role).catch(console.error);
        } catch (error) {
            console.log(error)
        }
        

        await interaction.editReply({
            content: `Olá, agora você tem acesso aos canais exclusivos para a comunidade ${grupoName}, fique a vontade mas não esqueça das regras!\nSe encontrar qualquer coisa de errado, ou alguém que não deveria esteja no grupo de vocês, basta abrir um ticket que iremos investigar!\nBoa sorte na sua jornada e bons jogos!`
        });
    }
}
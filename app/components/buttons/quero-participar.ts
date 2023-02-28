import { Client, ButtonInteraction, GuildMember, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
const { roleStreamerGoTeam, roleOpenTicket } = require('../../helpers/globalVariables.js');
const { verifyUserRoles } = require('../../helpers/verifyUserRoles.js');

module.exports = {
    data:{
        name: 'quero-participar'
    },
    async execute(interaction: ButtonInteraction, client: Client){

        const member = (interaction.member as GuildMember);

        if(await verifyUserRoles(member, roleStreamerGoTeam)){
            await interaction.reply({
                content: 'Você já faz parte do grupo da Go Team!',
                ephemeral: true
            })
            return;
        }
        
        if(await verifyUserRoles(member, roleOpenTicket)){
            await interaction.reply({
                content: `Você já possui um ticket em aberto`,
                ephemeral: true
            });
            return;
        }


        const modal = new ModalBuilder()
            .setCustomId('ticket-recrutamento')
            .setTitle('Recrutamento');
        ;
        const textInput = [];
        textInput.push(
            new TextInputBuilder()
                .setCustomId('nomeTwitch')
                .setLabel('Qual a sua twitch? (Apenas o nome)')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Nome do Canal')
        );
        textInput.push(
            new TextInputBuilder()
                .setCustomId('afiliadoTwitch')
                .setLabel('Já é um afiliado da Twitch?')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Sim ou Não')
        );
        textInput.push(
            new TextInputBuilder()
                .setCustomId('tempoLive')
                .setLabel('Há quanto tempo você faz live?')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
        );
        textInput.push(
            new TextInputBuilder()
                .setCustomId('objetivo')
                .setLabel('Qual o seu objetivo com o grupo e na twitch?')
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph)
        );
        textInput.push(
            new TextInputBuilder()
                .setCustomId('recomendacao')
                .setLabel('Como você conheceu a comunidade Go Team?')
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
        );
        
        modal.addComponents([
            new ActionRowBuilder().addComponents(textInput[0]),
            new ActionRowBuilder().addComponents(textInput[1]),
            new ActionRowBuilder().addComponents(textInput[2]),
            new ActionRowBuilder().addComponents(textInput[3]),
            new ActionRowBuilder().addComponents(textInput[4]),
        ] as any);

        await interaction.showModal(modal);
    }
}
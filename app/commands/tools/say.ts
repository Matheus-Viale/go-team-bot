import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Use para enviar mensagens, embeds ou botões (Abre um modal para escrever)!')
        .addStringOption((option) => 
            option
                .setName('tipo')
                .setDescription('Qual tipo de mensagem você vai enviar?')
                .setChoices(
                    {name: 'Texto', value: 'texto'},
                    {name: 'Embed', value: 'embed'},
                    {name: 'Botão', value: 'button'},
                )
                .setRequired(true)
        )
    ,
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        const member = (interaction.member as GuildMember)
        if(!await verifyUserRoles(member, roleStreamerGoTeam)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }     

        const tipo = interaction.options.getString('tipo');
        let modal;
        let textInput;

        if(tipo == 'texto'){
            modal = new ModalBuilder()
            .setCustomId('say-modal')
            .setTitle('O que o bot vai dizer?');

            textInput = new TextInputBuilder()
                .setCustomId('sayInput')
                .setLabel('Escreva o que o bot irá dizer:')
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph);
        }

        if(tipo == 'embed'){
            modal = new ModalBuilder()
            .setCustomId('say-embed-modal')
            .setTitle('O que o bot vai dizer?');

            textInput = new TextInputBuilder()
                .setCustomId('sayEmbedInput')
                .setLabel('Escreva o construtor de modal:')
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph);
        }

        if(tipo == 'button'){
            modal = new ModalBuilder()
            .setCustomId('say-button-modal')
            .setTitle('O que o bot vai dizer?');

            textInput = new TextInputBuilder()
                .setCustomId('sayButtonInput')
                .setLabel('Escreva o construtor de botão:')
                .setRequired(true)
                .setStyle(TextInputStyle.Paragraph);
        }
        

        
        modal.addComponents(new ActionRowBuilder().addComponents(textInput) as any);

        await interaction.showModal(modal);

    }
}
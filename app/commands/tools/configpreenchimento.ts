import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
import alteraStatusPreenchimento from '../../helpers/alteraStatusPreenchimento';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('testepreenchimento')
        .setDescription('Retorna meu ping!')
        .addStringOption((option) => 
            option
                .setName('status')
                .setDescription('Qual status você gostaria no preenchimento?')
                .setChoices(
                    {name: 'Ativado', value: 'ativado'},
                    {name: 'Desativado', value: 'desativado'}
                )
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        
        await interaction.deferReply({
            ephemeral: true
        })
        
        const member = (interaction.member as GuildMember)
        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }
        const status = interaction.options.getString('status');
        
        const retorno = await alteraStatusPreenchimento(status);
        
        if(retorno == 'IGUAL'){
            await interaction.editReply({
                content: `O preenchimento já se encontra com o status (${status})`
            })
            return;
        }

        if(retorno == 'ALTERADO'){
            await interaction.editReply({
                content: `O preenchimento foi alterado para o status (${status})`
            })
            return;
        }

        if(retorno == 'ERROR'){
            await interaction.editReply({
                content: `Houve um erro na troca do status do preenchimento, por favor tente novamente, se persistir entre em contato com o suporte!`
            })
            return;
        }
    }
}
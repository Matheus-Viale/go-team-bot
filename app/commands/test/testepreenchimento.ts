import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import Preenchimento from "../../schemas/preenchimento";
import mongoose = require('mongoose');
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
import alteraStatusPreenchimento from '../../helpers/alteraStatusPreenchimento';


module.exports = {
    data: new SlashCommandBuilder()
        .setName('testepreenchimento')
        .setDescription('Retorna meu ping!'),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        const member = (interaction.member as GuildMember)
        
        await interaction.deferReply({
            ephemeral: true
        })

        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }

        const preenchimentoCriado = new Preenchimento({
            _id: new mongoose.Types.ObjectId()
        })

        preenchimentoCriado.save().then(async novoPreenchimento =>{
            console.log(novoPreenchimento._id)
        })

        /*const retorno = await alteraStatusPreenchimento('ativado');
        
        await interaction.editReply({
            content: 'OK'
        })*/
        

    }
}
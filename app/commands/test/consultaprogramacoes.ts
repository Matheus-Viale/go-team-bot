import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import schedule = require('node-schedule');
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('consultaprogramacoes')
        .setDescription('Retorna a lista dos eventos programados!'),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        await interaction.deferReply({ephemeral: true});
        const member = (interaction.member as GuildMember)
        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            await interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }

        
        
        const jobs = schedule.scheduledJobs;
        const jobsNames = []

        for(const job of Object.keys(jobs)){
            jobsNames.push(job)
        }

        const newMessage = `Jobs Agendados:\n\n${jobsNames.join('\n')}`
        await interaction.editReply({
            content: newMessage
        });

    }
}
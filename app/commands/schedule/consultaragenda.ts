import { Client, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import Agendamento from '../../schemas/agendamento.js';
const { roleStreamerGoTeam } = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('consultaragenda')
            .setDescription('Mostra a agenda do dia!')
            ,
        async execute(interaction: ChatInputCommandInteraction, client: Client){
            await interaction.deferReply({ephemeral: true});
            const member = (interaction.member as GuildMember);
            if(!await verifyUserRoles(member, roleStreamerGoTeam)){
                await interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                })
                return;
            }
            const dataAgendamento = new Date();
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

            let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
            if(!agendamentoCriado){
                await interaction.editReply({
                    content: `A agenda do dia ${dataStringAgendamento} ainda não foi montada!`
                });
                return;
            }

            const fieldsEmbed = [{ name: '\u200B', value: '\u200B' },];
            type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';
            for(let i: any = 10; i <= 22; i += 2){
                const horarioTag = ('streamerAgendado' + i) as Tag;
                if(agendamentoCriado[horarioTag] == 'nenhum' && i != 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às ${i+2}:00 :alarm_clock:`, value: `SEM AGENDAMENTO PARA ESTE HORÁRIO`},
                    { name: '\u200B', value: '\u200B' },)
                    continue;
                } else if(agendamentoCriado[horarioTag] == 'nenhum' && i == 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às 00:00 :alarm_clock:`, value: `SEM AGENDAMENTO PARA ESTE HORÁRIO`})
                    continue;
                }
                
                if(i != 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às ${i+2}:00 :alarm_clock:`, value: `https://www.twitch.tv/${agendamentoCriado[horarioTag].split('/')[1]}`},
                    { name: '\u200B', value: '\u200B' },)
                    continue;
                }

                if(i == 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às 00:00 :alarm_clock:`, value: `https://www.twitch.tv/${agendamentoCriado[horarioTag].split('/')[1]}`})
                    continue;
                }

                
            }

            const embed = new EmbedBuilder()
                    .setTitle(`Agenda do dia ${agendamentoCriado.diaAgendamento}`)
                    .setColor(0x6441A5)
                    .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                    .addFields(fieldsEmbed)
            ;

            await interaction.editReply({
                embeds: [embed]
            });
            

        }
}
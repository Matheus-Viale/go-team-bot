import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, GuildMember, GuildTextBasedChannel } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import Agendamento from '../../schemas/agendamento.js';
const {roleResponsavelTwitch , channelLiveTwitch} = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('staffconsultaragenda')
            .setDescription('Mostra a agenda completa! [STAFF]')
            .addIntegerOption((option) => 
                option
                    .setName('dia')
                    .setDescription('Consultar a agenda de qual dia?')
                    .setChoices(
                        {name: 'Hoje', value: 0 },
                        {name: 'Amanhã', value: 1 },
                    )
                    .setRequired(true)
            )
            .addStringOption((option) => 
                option
                    .setName('tipo')
                    .setDescription('Qual o modo de exibição da agenda? (Simples para consulta da staff, Completo para informar usuários)')
                    .setChoices(
                        {name: 'Simples', value: 'simples' },
                        {name: 'Completo', value: 'completo' },
                    )
                    .setRequired(true)
            ),
        async execute(interaction: ChatInputCommandInteraction, client: Client){
            await interaction.deferReply({ephemeral: true});

            const member = (interaction.member as GuildMember);
            if(!await verifyUserRoles(member, roleResponsavelTwitch)){
                await interaction.editReply({
                    content: 'Você não tem permissão para usar este comando!'
                })
                return;
            }

            const tipo = interaction.options.getString('tipo');
            const dia = interaction.options.getInteger('dia');
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + dia)
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

            let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
            if(!agendamentoCriado){
                await interaction.editReply({
                    content: `Não existe agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`
                });
                return;
            }

            if(tipo === 'simples'){
                interaction.editReply({
                    content: `AGENDA DA DATA: ${agendamentoCriado.diaAgendamento}
                    STREAMER DAS 10:00 > ${agendamentoCriado.streamerAgendado10}
                    STREAMER DAS 12:00 > ${agendamentoCriado.streamerAgendado12}
                    STREAMER DAS 14:00 > ${agendamentoCriado.streamerAgendado14}
                    STREAMER DAS 16:00 > ${agendamentoCriado.streamerAgendado16}
                    STREAMER DAS 18:00 > ${agendamentoCriado.streamerAgendado18}
                    STREAMER DAS 20:00 > ${agendamentoCriado.streamerAgendado20}
                    STREAMER DAS 22:00 > ${agendamentoCriado.streamerAgendado22}`
                });
                return;
            }
            const fieldsEmbed = [{ name: '\u200B', value: '\u200B' },];
            type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';
            for(let i: any = 10; i <= 22; i+=2){
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

            if(tipo === 'completo'){
                const embed = new EmbedBuilder()
                    .setTitle(`Agenda do dia ${agendamentoCriado.diaAgendamento}`)
                    .setColor(0x6441A5)
                    .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                    .addFields(fieldsEmbed)

                const channel = (await client.channels.fetch(channelLiveTwitch) as GuildTextBasedChannel);
                await channel.send({
                    embeds: [embed]
                });
                await interaction.editReply({
                    content: `AGENDA DA DATA: ${agendamentoCriado.diaAgendamento}
                    STREAMER DAS 10:00 > ${agendamentoCriado.streamerAgendado10}
                    STREAMER DAS 12:00 > ${agendamentoCriado.streamerAgendado12}
                    STREAMER DAS 14:00 > ${agendamentoCriado.streamerAgendado14}
                    STREAMER DAS 16:00 > ${agendamentoCriado.streamerAgendado16}
                    STREAMER DAS 18:00 > ${agendamentoCriado.streamerAgendado18}
                    STREAMER DAS 20:00 > ${agendamentoCriado.streamerAgendado20}
                    STREAMER DAS 22:00 > ${agendamentoCriado.streamerAgendado22}`
                })
                return;
            }
        }
}
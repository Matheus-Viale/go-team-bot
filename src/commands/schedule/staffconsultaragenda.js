const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {roleResponsavelTwitch , channelLiveTwitch} = require('../../helpers/globalVariables.js');
const {verifyUserRoles} = require('../../helpers/verifyUserRoles.js');
const Agendamento = require('../../schemas/agendamento.js');

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
        async execute(interaction, client){
            if(!await verifyUserRoles(interaction.member, roleResponsavelTwitch)){
                interaction.reply({
                    content: 'Você não tem permissão para usar este comando!',
                    ephemeral: true
                })
                return;
            }

            const tipo = await interaction.options.getString('tipo');
            const dia = await interaction.options.getInteger('dia');
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + dia)
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

            let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
            if(!agendamentoCriado){
                interaction.reply({
                    content: `Não existe agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`,
                    ephemeral: true
                });
                return;
            }

            if(tipo === 'simples'){
                interaction.reply({
                    content: `AGENDA DA DATA: ${agendamentoCriado.diaAgendamento}
                    STREAMER DAS 10:00 > ${agendamentoCriado.streamerAgendado10}
                    STREAMER DAS 12:00 > ${agendamentoCriado.streamerAgendado12}
                    STREAMER DAS 14:00 > ${agendamentoCriado.streamerAgendado14}
                    STREAMER DAS 16:00 > ${agendamentoCriado.streamerAgendado16}
                    STREAMER DAS 18:00 > ${agendamentoCriado.streamerAgendado18}
                    STREAMER DAS 20:00 > ${agendamentoCriado.streamerAgendado20}
                    STREAMER DAS 22:00 > ${agendamentoCriado.streamerAgendado22}`,
                    ephemeral: true
                });
                return;
            }
            const fieldsEmbed = [{ name: '\u200B', value: '\u200B' },];
            for(let i = 10; i <= 22; i+=2){
                const horarioTag = 'streamerAgendado' + i;
                if(agendamentoCriado[horarioTag] == 'nenhum' && i != 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às ${i+2}:00 :alarm_clock:`, value: `SEM AGENDAMENTO PARA ESTE HORÁRIO`},
                    { name: '\u200B', value: '\u200B' },)
                    continue;
                } else if(agendamentoCriado[horarioTag] == 'nenhum' && i == 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às 00:00 :alarm_clock:`, value: `SEM AGENDAMENTO PARA ESTE HORÁRIO`})
                    continue;
                }
                
                if(i != 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às ${i+2}:00 :alarm_clock:`, value: `https://www.twitch.tv/${agendamentoCriado[horarioTag]}`},
                    { name: '\u200B', value: '\u200B' },)
                    continue;
                }

                if(i == 22){
                    fieldsEmbed.push({name: `:alarm_clock: ${i}:00 às 00:00 :alarm_clock:`, value: `https://www.twitch.tv/${agendamentoCriado[horarioTag]}`})
                    continue;
                }

                
            }

            if(tipo === 'completo'){
                const embed = new EmbedBuilder()
                    .setTitle(`Agenda do dia ${agendamentoCriado.diaAgendamento}`)
                    .setColor(0x6441A5)
                    .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                    .addFields(fieldsEmbed)

                const channel = client.channels.cache.get(channelLiveTwitch);
                await channel.send({
                    embeds: [embed]
                });
                await interaction.reply({
                    content: `AGENDA DA DATA: ${agendamentoCriado.diaAgendamento}
                    STREAMER DAS 10:00 > ${agendamentoCriado.streamerAgendado10}
                    STREAMER DAS 12:00 > ${agendamentoCriado.streamerAgendado12}
                    STREAMER DAS 14:00 > ${agendamentoCriado.streamerAgendado14}
                    STREAMER DAS 16:00 > ${agendamentoCriado.streamerAgendado16}
                    STREAMER DAS 18:00 > ${agendamentoCriado.streamerAgendado18}
                    STREAMER DAS 20:00 > ${agendamentoCriado.streamerAgendado20}
                    STREAMER DAS 22:00 > ${agendamentoCriado.streamerAgendado22}`,
                    ephemeral: true
                })
                return;
            }
        }
}
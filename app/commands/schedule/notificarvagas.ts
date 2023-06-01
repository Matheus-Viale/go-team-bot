import { Client, SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, EmbedBuilder, GuildTextBasedChannel } from 'discord.js';
import verificaHorariosVagos from '../../helpers/attendance/verificaHorariosVagos.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import alteraStatusPreenchimento from '../../helpers/alteraStatusPreenchimento.js';
const { roleResponsavelTwitch, channelMarcarTwitch, roleStreamerGoTeam } = require('../../helpers/globalVariables.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('notificarvagas')
        .setDescription('Notificas os Streamers sobre os horários em aberto!')
        .addIntegerOption((option) => 
            option
                .setName('dia')
                .setDescription('A(s) vaga(s) é(são) para hoje ou amanhã?')
                .setChoices(
                    {name: 'Hoje', value: 0 },
                    {name: 'Amanhã', value: 1 },
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

        

        let diaString = 'HOJE'
        const dia = interaction.options.getInteger('dia');
        const dataHoje = new Date();
        dataHoje.setDate(dataHoje.getDate() + dia);
        const dataString = dataHoje.toLocaleDateString('pt-BR');

        if(dia == 1) diaString = 'AMANHÃ';

        const horarios = await verificaHorariosVagos(dataString);

        if(horarios.status == 'SEM AGENDAMENTO'){
            await interaction.editReply({
                content: `Não existe agendamento criado para a data ${dataString}`
            });
            return;
        }

        if(horarios.status == 'SEM VAGAS'){
            await interaction.editReply({
                content: `Não existe vagas na data ${dataString}`
            });
            return;
        }

        const fieldsEmbed = [{ name: '\u200B', value: '\u200B' },];
        for(const horario of horarios.horariosVagos){
            fieldsEmbed.push({name: `:alarm_clock: ${horario}:00 às ${horario+2}:00 :alarm_clock:`, value: `\u200B`})
        }
        const embed = new EmbedBuilder()
                    .setTitle(`Como solicitar?`)
                    .setDescription(`\n**Preenchimento?**\nCaso tenha passado do horário de solicitações e a STAFF informou que existem horários disponíves, basta usar a opção preenchimento SIM e poderá fazer a solicitação fora de horário\n\n**AVISO!**\nO uso da opção de preenchimento sem autorização da STAFF resultará em advertência!`)
                    .setColor(0x6441A5)
                    .setThumbnail('https://i.imgur.com/j1yOXKJ.png')
                    .addFields(fieldsEmbed)
        ;
        const channel = (await client.channels.fetch(channelMarcarTwitch) as GuildTextBasedChannel);
        await channel.send({
            embeds: [embed],
            content: `<@&${roleStreamerGoTeam}>\nHORÁRIOS DISPONIVEIS ${diaString}`
        });
        

        const retorno = await alteraStatusPreenchimento('ativado');

        let messagemPreenchimento;

        if(retorno == 'ALTERADO'){
            messagemPreenchimento = 'e o preenchimento foi ativado!'
        }

        if(retorno == 'IGUAL'){
            messagemPreenchimento = 'e o preenchimento já estava ativado!'
        }

        if(retorno == 'ERROR'){
            messagemPreenchimento = 'e houve um erro em alterar o preenchimento, favor tente manualmente!'
        }
        
        await interaction.editReply({
            content: `Notificação enviada no canal <#${channelMarcarTwitch}> ` + messagemPreenchimento
        });
        

    }
}
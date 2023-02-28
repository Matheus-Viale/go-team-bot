import { Client, ChatInputCommandInteraction, SlashCommandBuilder, GuildMember, GuildTextBasedChannel } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import Agendamento from '../../schemas/agendamento.js';
import removeAgendaVerificadorPresenca  from '../../helpers/schedule/removeAgendaVerificadorPresenca.js';
import removeAgendaMensagemStreamer  from '../../helpers/schedule/removeAgendaMensagemStreamer.js';
const {roleResponsavelTwitch, channelAgendamentoStaff} = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removeragendamento')
    .setDescription('Remove um agendamento! [STAFF]')
    .addIntegerOption((option) => 
        option
            .setName('horario')
            .setDescription('Qual horário será removido?')
            .setChoices(
                {name: '10:00', value: 10 },
                {name: '12:00', value: 12 },
                {name: '14:00', value: 14 },
                {name: '16:00', value: 16 },
                {name: '18:00', value: 18 },
                {name: '20:00', value: 20 },
                {name: '22:00', value: 22 },
            )
            .setRequired(true)
    )
    .addIntegerOption((option) => 
        option
            .setName('dia')
            .setDescription('O agendamento a ser removido é hoje ou amanhã?')
            .setChoices(
                {name: 'Hoje', value: 0 },
                {name: 'Amanhã', value: 1 },
            )
            .setRequired(true)
    ),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const member = (interaction.member as GuildMember);
        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }

        const {guild} = interaction;
        const channelAgendamentoStaffFetch = (await guild.channels.fetch(channelAgendamentoStaff) as GuildTextBasedChannel);

        const horario = interaction.options.getInteger('horario');
        type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22'
        const horarioTag = ('streamerAgendado' + horario) as Tag;
        const dia = interaction.options.getInteger('dia');
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + dia);
        const diaAgendamento = dataAgendamento.getDate();
        const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        
        if(!agendamentoCriado){
            interaction.editReply({
                content: `Não existe agendamento criado para o dia ${dataStringAgendamento}`
            });
            return;
        }

        if(agendamentoCriado[horarioTag] == 'nenhum'){
            interaction.editReply({
                content: `Não há nenhum streamer agendado para o dia ${agendamentoCriado.diaAgendamento} no horário das ${horario}:00`
            })
            return;
        }

        agendamentoCriado[horarioTag] = 'nenhum';
        await agendamentoCriado.save().then(async novoAgendamento =>{
            await removeAgendaVerificadorPresenca(diaAgendamento, horario);
            await removeAgendaMensagemStreamer(diaAgendamento, horario);
            channelAgendamentoStaffFetch.send({
                content: `Agendamento da data ${novoAgendamento.diaAgendamento} no horário das ${horario} foi removido por ${member.displayName}!`
            })
            interaction.editReply({
                content: `Agendamento da data ${novoAgendamento.diaAgendamento} no horário das ${horario} foi removido!`
            })
        })
        
    }
}
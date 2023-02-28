import { SlashCommandBuilder, Client, ChatInputCommandInteraction, GuildMember, GuildTextBasedChannel } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import Agendamento from '../../schemas/agendamento.js';
import agendaVerificadorPresenca from '../../helpers/schedule/agendaVerificadorPresenca.js';
import agendaMensagemStreamer from '../../helpers/schedule/agendaMensagemStreamer.js';
const { roleResponsavelTwitch, channelAgendamentoStaff } = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('agendamentosimples')
    .setDescription('Agenda um streamer para um horário pré definido! [STAFF]')
    .addUserOption((option) => 
        option
        .setName('streamer')
        .setDescription('Qual Streamer irá fazer a live?')
        .setRequired(true)
    )
    .addIntegerOption((option) => 
        option
            .setName('horario')
            .setDescription('Qual o horário o Streamer será agendado?')
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
            .setDescription('O agendamento é para hoje ou amanhã?')
            .setChoices(
                {name: 'Hoje', value: 0 },
                {name: 'Amanhã', value: 1 },
            )
            .setRequired(true)
    ),
    async execute(interaction: ChatInputCommandInteraction, client: Client){

        await interaction.deferReply({ephemeral: true})
        const {guild} = interaction;
        const member = (interaction.member as GuildMember)
        if(!await verifyUserRoles(member, roleResponsavelTwitch)){
            interaction.editReply({
                content: 'Você não tem permissão para usar este comando!'
            })
            return;
        }

        
        const channelAgendamentoStaffFetch = (await guild.channels.fetch(channelAgendamentoStaff) as GuildTextBasedChannel)

        const streamer = (interaction.options.getMember('streamer') as GuildMember);
        const streamerId = streamer.id;
        const streamerNickname = streamer.displayName;

        if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
            interaction.editReply({
                content: 'Nome do streamer não está no padrão twitch.tv/NickTwitch, alterar antes de agendar!'
            })
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const horario = interaction.options.getInteger('horario');
        type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22';
        const horarioTag: Tag = ('streamerAgendado' + horario as Tag);
        const dia = interaction.options.getInteger('dia');
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + dia)
        const diaAgendamento = dataAgendamento.getDate();
        const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        if(!agendamentoCriado){
            interaction.editReply({
                content: `Não existe tabela de agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`
            });
            return;
        }

        if(agendamentoCriado[horarioTag] != 'nenhum'){
            interaction.editReply({
                content: `O streamer ${agendamentoCriado[horarioTag]} já está agendado para o horário das ${horario}:00, se deseja substituir usar o comando /alteraragendamento`
            });
            return;
        }

        agendamentoCriado[horarioTag] = streamerNickname;
        await agendamentoCriado.save().then(async novoAgendamento =>{
            await agendaVerificadorPresenca(dataAgendamento, diaAgendamento, horario, streamerTwitch, client);
            await agendaMensagemStreamer(dataAgendamento, diaAgendamento, horario, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
            channelAgendamentoStaffFetch.send({
                content: `Agenda da data ${novoAgendamento.diaAgendamento} foi atualizada por ${member.displayName} com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
            })
            interaction.editReply({
                content: `Agenda da data ${novoAgendamento.diaAgendamento} atualizada com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
            })
        })
    
    }
}
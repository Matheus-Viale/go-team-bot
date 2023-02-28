import { SlashCommandBuilder, Client, ChatInputCommandInteraction, GuildMember, GuildTextBasedChannel } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import Agendamento from '../../schemas/agendamento.js';
import agendaVerificadorPresenca from '../../helpers/schedule/agendaVerificadorPresenca.js';
import removeAgendaVerificadorPresenca from '../../helpers/schedule/removeAgendaVerificadorPresenca.js';
import removeAgendaMensagemStreamer from '../../helpers/schedule/removeAgendaMensagemStreamer.js';
import agendaMensagemStreamer from '../../helpers/schedule/agendaMensagemStreamer.js';
const { roleResponsavelTwitch, channelAgendamentoStaff } = require('../../helpers/globalVariables.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alteraragendamento')
    .setDescription('Altera um agendamento já existente! [STAFF]')
    .addUserOption((option) => 
        option
        .setName('streamer')
        .setDescription('Quem será o novo streamer?')
        .setRequired(true)
    )
    .addIntegerOption((option) => 
        option
            .setName('horario')
            .setDescription('Qual horário será alterado?')
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
            .setDescription('O agendamento a ser alterado é hoje ou amanhã?')
            .setChoices(
                {name: 'Hoje', value: 0 },
                {name: 'Amanhã', value: 1 },
            )
            .setRequired(true)
    ),
    async execute(interaction: ChatInputCommandInteraction, client: Client){
        await interaction.deferReply({ephemeral: true})
        const {guild, member} = interaction;
        if(!await verifyUserRoles((member as GuildMember), roleResponsavelTwitch)){
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
            });
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const horario = interaction.options.getInteger('horario');
        type Tag = 'streamerAgendado10' | 'streamerAgendado12' | 'streamerAgendado14' | 'streamerAgendado16' | 'streamerAgendado18' | 'streamerAgendado20' | 'streamerAgendado22'
        const horarioTag: string | Tag = 'streamerAgendado' + horario;
        const dia = interaction.options.getInteger('dia');
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + dia);
        const diaAgendamento = dataAgendamento.getDate();
        const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        
        if(!agendamentoCriado){
            interaction.editReply({
                content: `Não existe agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`
            });
            return;
        }

        if(agendamentoCriado[(horarioTag as Tag)] == 'nenhum'){
            interaction.editReply({
                content: `Não há nenhum streamer agendado para o dia ${agendamentoCriado.diaAgendamento} no horário das ${horario}:00, se deseja agendar usar o comando /agendamentosimples`
            })
            return;
        }

        agendamentoCriado[(horarioTag as Tag)] = streamerNickname;
        
        await removeAgendaVerificadorPresenca(diaAgendamento, horario);
        await removeAgendaMensagemStreamer(diaAgendamento, horario);

        await agendamentoCriado.save().then(async novoAgendamento =>{
            await agendaVerificadorPresenca(dataAgendamento, diaAgendamento, horario, streamerTwitch, client);
            await agendaMensagemStreamer(dataAgendamento, diaAgendamento, horario, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
            channelAgendamentoStaffFetch.send({
                content: `Agendamento da data ${novoAgendamento.diaAgendamento} foi atualizado por ${(member as GuildMember).displayName} com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
            })
            await interaction.editReply({
                content: `Agendamento da data ${novoAgendamento.diaAgendamento} atualizado com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
            })
        })
        
    }
}
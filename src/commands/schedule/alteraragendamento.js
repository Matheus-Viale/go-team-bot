const { SlashCommandBuilder } = require('discord.js');
const {roleResponsavelTwitch} = require('../../helpers/globalVariables.js');
const {verifyUserRoles} = require('../../helpers/verifyUserRoles.js');
const Agendamento = require('../../schemas/agendamento.js');
const { agendaVerificadorPresenca } = require('../../helpers/schedule/agendaVerificadorPresenca.js');
const {removeAgendaVerificadorPresenca} = require('../../helpers/schedule/removeAgendaVerificadorPresenca.js');
const { removeAgendaMensagemStreamer } = require('../../helpers/schedule/removeAgendaMensagemStreamer.js');
const { agendaMensagemStreamer } = require('../../helpers/schedule/agendaMensagemStreamer.js');

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
                {name: '14:00', value: 13 },
                {name: '16:00', value: 16 },
                {name: '18:00', value: 28 },
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
    async execute(interaction, client){

        if(!await verifyUserRoles(interaction.member, roleResponsavelTwitch)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }

        const channelCommand = interaction.channelId
        if(channelCommand != channelAgendamentoStaff){
            interaction.reply({
                content: 'Favor usar os comandos de agendamento no canal Agendamento [STAFF]',
                ephemeral: true
            })
            return;
        }

        const streamer = await interaction.options.getMember('streamer');
        const streamerId = streamer.id;
        const streamerNickname = streamer.displayName;

        if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
            interaction.reply({
                content: 'Nome do streamer não está no padrão twitch.tv/NickTwitch, alterar antes de agendar!',
                ephemeral: true
            });
            return;
        }

        const streamerTwitch = streamerNickname.split('/')[1];
        const horario = await interaction.options.getInteger('horario');
        const horarioTag = 'streamerAgendado' + horario;
        const dia = await interaction.options.getInteger('dia');
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + dia);
        const diaAgendamento = dataAgendamento.getDate();
        const dataStringAgendamento = dataAgendamento.toLocaleDateString();

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        
        if(!agendamentoCriado){
            interaction.reply({
                content: `Não existe agendamento criado para o dia ${dataStringAgendamento}, favor criar usando /agendamentocompleto`,
                ephemeral: true
            });
            return;
        }

        if(agendamentoCriado[horarioTag] == 'nenhum'){
            interaction.reply({
                content: `Não há nenhum streamer agendado para o dia ${agendamentoCriado.diaAgendamento} no horário das ${horario}:00, se deseja agendar usar o comando /agendamentosimples`,
                ephemeral: true
            })
        }

        agendamentoCriado[horarioTag] = streamerTwitch;
        await agendamentoCriado.save().then(async novoAgendamento =>{
            await removeAgendaVerificadorPresenca(diaAgendamento, horario);
            await removeAgendaMensagemStreamer(diaAgendamento, horario);
            await agendaVerificadorPresenca(dataAgendamento, diaAgendamento, horario, streamerNickname, client);
            await agendaMensagemStreamer(dataAgendamento, diaAgendamento, horario, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
            await interaction.reply({
                content: `Agendamento da data ${novoAgendamento.diaAgendamento} atualizado com o streamer ${streamerTwitch} agendado para o horário das ${horario}:00`
            })
        })
        
    }
}
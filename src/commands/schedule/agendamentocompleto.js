const { SlashCommandBuilder } = require('discord.js');
const {roleResponsavelTwitch, channelAgendamentoStaff} = require('../../helpers/globalVariables.js');
const {verifyUserRoles} = require('../../helpers/verifyUserRoles.js');
const { agendaVerificadorPresenca } = require('../../helpers/schedule/agendaVerificadorPresenca.js');
const Agendamento = require('../../schemas/agendamento.js');
const mongoose = require('mongoose');
const { agendaMensagemStreamer } = require('../../helpers/schedule/agendaMensagemStreamer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('agendamentocompleto')
        .setDescription('Cria e monta a agenda completa! [STAFF]')
        .addIntegerOption((option) => 
            option
                .setName('dia')
                .setDescription('O agendamento é para hoje ou amanhã?')
                .setChoices(
                    {name: 'Hoje', value: 0 },
                    {name: 'Amanhã', value: 1 },
                )
                .setRequired(true)
        )
        .addUserOption((option) => 
            option
                .setName('streamer10')
                .setDescription('Qual Streamer irá fazer a live às 10:00?')
        )
        .addUserOption((option) => 
            option
                .setName('streamer12')
                .setDescription('Qual Streamer irá fazer a live às 12:00?')
        )
        .addUserOption((option) => 
            option
                .setName('streamer14')
                .setDescription('Qual Streamer irá fazer a live às 14:00?')
        )
        .addUserOption((option) => 
            option
                .setName('streamer16')
                .setDescription('Qual Streamer irá fazer a live às 16:00?')
        )
        .addUserOption((option) => 
            option
                .setName('streamer18')
                .setDescription('Qual Streamer irá fazer a live às 18:00?')
        )
        .addUserOption((option) => 
            option
                .setName('streamer20')
                .setDescription('Qual Streamer irá fazer a live às 20:00?')
        )
        .addUserOption((option) => 
            option
                .setName('streamer22')
                .setDescription('Qual Streamer irá fazer a live às 22:00?')
        )
    ,
    async execute(interaction, client){
        
        if(!await verifyUserRoles(await interaction.member, roleResponsavelTwitch)){
            interaction.reply({
                content: 'Você não tem permissão para usar este comando!',
                ephemeral: true
            })
            return;
        }

        const channelCommand = await interaction.channelId;
        if(channelCommand != channelAgendamentoStaff){
            interaction.reply({
                content: 'Favor usar os comandos de agendamento no canal Agendamento [STAFF]',
                ephemeral: true
            })
            return;
        }

        const dia = await interaction.options.getInteger('dia');
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + dia)
        const dataStringAgendamento = dataAgendamento.toLocaleDateString();

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        if(agendamentoCriado){
            interaction.reply({
                content: `Já existe um agendamento criado para o dia ${dataStringAgendamento}, favor utilizar os comandos /agendamentosimples, /alteraragendamento e /removeragendamento`,
                ephemeral: true
            });
            return;
        }

        const streamersAgendados = [];
        const streamersErro = [];
        for(let i = 10; i <= 22; i+=2){
            const streamer = await interaction.options.getMember('streamer' + i);
            if(streamer == null){
                streamersAgendados.push('nenhum')
                continue;
            }
            const streamerNickname = streamer.displayName;
            if(!streamerNickname.toLowerCase().includes('twitch.tv/')){
                streamersErro.push(streamerNickname);
                continue;
            }
            const streamerId = streamer.id
            const streamerTwitch = streamerNickname.split('/')[1];
            streamersAgendados.push(streamerNickname)
            const diaAgendamento = dataAgendamento.getDate();
            const horaAgendamento = i;
            await agendaVerificadorPresenca(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, client);
            await agendaMensagemStreamer(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
        }
        if(streamersErro.length > 0){
            const streamersErroString = streamersErro.join(', ');
            interaction.reply({
                content: `O(s) nome(s) ${streamersErroString} não estão no padrão twitch.tv/NickTwitch, alterar antes de agendar!`,
                ephemeral: true
            });
            return;
        }

        agendamentoCriado = new Agendamento({
            _id: mongoose.Types.ObjectId(),
            diaAgendamento: dataStringAgendamento,
            streamerAgendado10: streamersAgendados[0],
            streamerAgendado12: streamersAgendados[1],
            streamerAgendado14: streamersAgendados[2],
            streamerAgendado16: streamersAgendados[3],
            streamerAgendado18: streamersAgendados[4],
            streamerAgendado20: streamersAgendados[5],
            streamerAgendado22: streamersAgendados[6]
        });

        await agendamentoCriado.save().then(async novoAgendamento =>{
            interaction.reply({
                content: `Agendamento para a data ${novoAgendamento.diaAgendamento} foi criado com sucesso! Para ver a agenda usar o comando /consultaragenda`
            });
        })
    }
}
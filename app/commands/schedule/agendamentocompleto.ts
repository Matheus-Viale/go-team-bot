import { SlashCommandBuilder, Client, ChatInputCommandInteraction, GuildMember, GuildTextBasedChannel } from 'discord.js';
import verifyUserRoles from '../../helpers/verifyUserRoles.js';
import Agendamento from '../../schemas/agendamento.js';
import mongoose = require('mongoose');
import agendaMensagemStreamer from '../../helpers/schedule/agendaMensagemStreamer.js';
import agendaVerificadorPresenca from '../../helpers/schedule/agendaVerificadorPresenca.js';
const {roleResponsavelTwitch, channelAgendamentoStaff} = require('../../helpers/globalVariables.js');

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

        const dia = interaction.options.getInteger('dia');
        const dataAgendamento = new Date();
        dataAgendamento.setDate(dataAgendamento.getDate() + dia)
        const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');

        let agendamentoCriado = await Agendamento.findOne({diaAgendamento: dataStringAgendamento});
        if(agendamentoCriado){
            interaction.editReply({
                content: `Já existe um agendamento criado para o dia ${dataStringAgendamento}, favor utilizar os comandos /agendamentosimples, /alteraragendamento e /removeragendamento`
            });
            return;
        }

        const streamersAgendados: string[] = [];
        const streamersErro: string[] = [];
        for(let i = 10; i <= 22; i+=2){
            const streamer = (interaction.options.getMember('streamer' + i) as GuildMember);
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
            interaction.editReply({
                content: `O(s) nome(s) ${streamersErroString} não estão no padrão twitch.tv/NickTwitch, alterar antes de agendar!`
            });
            return;
        }

        agendamentoCriado = new Agendamento({
            _id: new mongoose.Types.ObjectId(),
            createdAt: new Date(),
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
            channelAgendamentoStaffFetch.send({
                content: `${member.displayName} realizou o agendamento completo para: ${novoAgendamento.diaAgendamento}\nPara ver a agenda use **/staffconsultaragenda**`
            })
            interaction.editReply({
                content: `Agendamento para a data ${novoAgendamento.diaAgendamento} foi criado com sucesso!`
            });
        })
    }
}
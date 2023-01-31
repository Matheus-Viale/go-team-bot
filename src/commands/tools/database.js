const Guild = require('../../schemas/guild.js');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Retorna informação sobre o banco de dados!'),
    async execute(interaction, client){
        let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
        if(!guildProfile){
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildId: interaction.guild.id,
                guildName: interaction.guild.name,
                guildIcon: interaction.guild.iconURL() ? interaction.guild.iconURL() : 'none'
            });
            await guildProfile.save().catch(console.error);
            await interaction.reply({
                content: `Servidor ${guildProfile.guildName} cadastrado com sucesso!`
            })
        } else{
            await interaction.reply({
                content: `Servidor ${guildProfile.guildName} já cadastrado!\n Id: ${guildProfile.guildId}`
            })
        }
    }
}
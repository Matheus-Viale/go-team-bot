const { InteractionType } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        if(interaction.isChatInputCommand()){
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName)

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'Não consegui executar o comando, tente novamente ou entre em contato com o suporte!',
                    ephemeral: true
                })
            }
        } else if(interaction.isButton()){
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);
            if(!button) return new Error('Esse botão não foi criado ainda!');

            try{
                await button.execute(interaction, client);
            } catch (err){
                console.log(err);
            }
        } else if(interaction.isStringSelectMenu()){
            const { selectMenus } = client;
            const { customId } = interaction;
            const menu = selectMenus.get(customId);
            if(!menu) return new Error('Esse menu não foi criado ainda!');
            
            try{
                await menu.execute(interaction, client);
            } catch (err){
                console.log(err);
            }
        } else if(interaction.type == InteractionType.ModalSubmit){
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);
            if(!modal) return new Error('Esse modal não foi criado ainda!');

            try{
                await modal.execute(interaction, client);
            } catch (err){
                console.log(err);
            }
        }
        
    }
}
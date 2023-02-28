"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.isChatInputCommand()) {
                const { commands } = client;
                const { commandName } = interaction;
                const command = commands.get(commandName);
                if (!command)
                    return;
                try {
                    yield command.execute(interaction, client);
                }
                catch (error) {
                    console.error(error);
                    yield interaction.reply({
                        content: 'Não consegui executar o comando, tente novamente ou entre em contato com o suporte!',
                        ephemeral: true
                    });
                }
            }
            else if (interaction.isButton()) {
                const { buttons } = client;
                const { customId } = interaction;
                const button = buttons.get(customId);
                if (!button)
                    return new Error('Esse botão não foi criado ainda!');
                try {
                    yield button.execute(interaction, client);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else if (interaction.isStringSelectMenu()) {
                const { selectMenus } = client;
                const { customId } = interaction;
                const menu = selectMenus.get(customId);
                if (!menu)
                    return new Error('Esse menu não foi criado ainda!');
                try {
                    yield menu.execute(interaction, client);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else if (interaction.type == discord_js_1.InteractionType.ModalSubmit) {
                const { modals } = client;
                const { customId } = interaction;
                const modal = modals.get(customId);
                if (!modal)
                    return new Error('Esse modal não foi criado ainda!');
                try {
                    yield modal.execute(interaction, client);
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
};

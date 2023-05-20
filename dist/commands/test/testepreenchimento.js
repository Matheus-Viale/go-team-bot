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
const alteraStatusPreenchimento_1 = require("../../helpers/alteraStatusPreenchimento");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('testepreenchimento')
        .setDescription('Retorna meu ping!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            yield interaction.deferReply({
                ephemeral: true
            });
            /*const preenchimentoCriado = new Preenchimento({
                _id: new mongoose.Types.ObjectId()
            })
    
            preenchimentoCriado.save().then(async novoPreenchimento =>{
                console.log(novoPreenchimento._id)
            })*/
            const retorno = yield (0, alteraStatusPreenchimento_1.default)('ativado');
            console.log(retorno);
            yield interaction.editReply({
                content: 'OK'
            });
        });
    }
};

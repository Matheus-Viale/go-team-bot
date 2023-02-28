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
const verifyUserRoles_js_1 = require("../../helpers/verifyUserRoles.js");
const schedule = require("node-schedule");
const { roleResponsavelTwitch } = require('../../helpers/globalVariables.js');
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('consultaprogramacoes')
        .setDescription('Retorna a lista dos eventos programados!'),
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.member;
            if (!(yield (0, verifyUserRoles_js_1.default)(member, roleResponsavelTwitch))) {
                interaction.reply({
                    content: 'Você não tem permissão para usar este comando!',
                    ephemeral: true
                });
                return;
            }
            yield interaction.deferReply({ ephemeral: true });
            const jobs = schedule.scheduledJobs;
            const jobsNames = [];
            for (const job of Object.keys(jobs)) {
                jobsNames.push(job);
            }
            const newMessage = `Jobs Agendados:\n\n${jobsNames.join('\n')}`;
            yield interaction.editReply({
                content: newMessage
            });
        });
    }
};

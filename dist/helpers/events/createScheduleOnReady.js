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
const agendamento_js_1 = require("../../schemas/agendamento.js");
const agendaMensagemStreamer_js_1 = require("../schedule/agendaMensagemStreamer.js");
const agendaVerificadorPresenca_js_1 = require("../schedule/agendaVerificadorPresenca.js");
const { guildId } = require('../globalVariables.js');
function createScheduleOnReady(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataAgendamento = new Date();
        const horaReady = dataAgendamento.getHours();
        const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
        let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
        if (!agendamentoCriado)
            return;
        const diaAgendamento = dataAgendamento.getDate();
        for (let i = 10; i <= 22; i += 2) {
            if (i <= horaReady || horaReady == i + 1)
                continue;
            const horarioTag = ('streamerAgendado' + i);
            const streamerNickname = agendamentoCriado[horarioTag];
            if (streamerNickname == 'nenhum')
                continue;
            const streamerTwitch = streamerNickname.split('/')[1];
            const guild = yield client.guilds.fetch(guildId);
            try {
                const streamerId = guild.members.cache.find(member => member.displayName == streamerNickname).id;
                yield (0, agendaMensagemStreamer_js_1.default)(dataAgendamento, diaAgendamento, i, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
                yield (0, agendaVerificadorPresenca_js_1.default)(dataAgendamento, diaAgendamento, i, streamerTwitch, client);
            }
            catch (error) {
                console.error;
            }
        }
    });
}
exports.default = createScheduleOnReady;

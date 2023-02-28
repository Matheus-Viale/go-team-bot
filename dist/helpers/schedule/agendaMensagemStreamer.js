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
const schedule = require("node-schedule");
const enviaMensagemFinal_js_1 = require("../messages/enviaMensagemFinal.js");
const enviaMensagemLembrete_js_1 = require("../messages/enviaMensagemLembrete.js");
const enviaMensagemLive_js_1 = require("../messages/enviaMensagemLive.js");
const enviaMensagemLiveWpp_js_1 = require("../messages/enviaMensagemLiveWpp.js");
const getRaidStreamer_js_1 = require("../messages/getRaidStreamer.js");
const agendaMensagemStreamer = (dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client) => __awaiter(void 0, void 0, void 0, function* () {
    const dateLembrete = dataAgendamento.setHours(horaAgendamento - 1, 50, 0o0, 0o0);
    const dateLive = dataAgendamento.setHours(horaAgendamento, 0o5, 0o0, 0o0);
    const dateFinal = dataAgendamento.setHours(horaAgendamento + 1, 55, 0o0, 0o0);
    try {
        schedule.scheduleJob('mensagemLembreteStreamer' + diaAgendamento + horaAgendamento, dateLembrete, () => __awaiter(void 0, void 0, void 0, function* () {
            (0, enviaMensagemLembrete_js_1.default)(streamerTwitch, horaAgendamento, streamerId, client);
        }));
    }
    catch (error) {
        console.log(error);
    }
    try {
        schedule.scheduleJob('mensagemLiveStreamer' + diaAgendamento + horaAgendamento, dateLive, () => __awaiter(void 0, void 0, void 0, function* () {
            (0, enviaMensagemLive_js_1.default)(streamerTwitch, horaAgendamento, client);
        }));
    }
    catch (error) {
        console.log(error);
    }
    try {
        schedule.scheduleJob('mensagemLiveStreamerWpp' + diaAgendamento + horaAgendamento, dateLive, () => __awaiter(void 0, void 0, void 0, function* () {
            const streamerRaid = yield (0, getRaidStreamer_js_1.default)(streamerNickname, horaAgendamento, dataStringAgendamento);
            (0, enviaMensagemLiveWpp_js_1.default)(streamerTwitch, horaAgendamento, streamerRaid);
        }));
    }
    catch (error) {
        console.log(error);
    }
    try {
        schedule.scheduleJob('mensagemFinalStreamer' + diaAgendamento + horaAgendamento, dateFinal, () => __awaiter(void 0, void 0, void 0, function* () {
            const streamerRaid = yield (0, getRaidStreamer_js_1.default)(streamerNickname, horaAgendamento, dataStringAgendamento);
            (0, enviaMensagemFinal_js_1.default)(streamerTwitch, horaAgendamento, streamerId, streamerRaid, client);
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = agendaMensagemStreamer;

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
const armazenaPresencas_js_1 = require("../attendance/armazenaPresencas.js");
const agendaVerificadorPresenca = (dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, client) => __awaiter(void 0, void 0, void 0, function* () {
    const minutoAleatorio = Math.floor(Math.random() * (59 - 30) + 30);
    const minutoAleatorio2 = Math.floor(Math.random() * (55 - 30) + 30);
    const date = new Date(dataAgendamento.setHours(horaAgendamento, minutoAleatorio));
    const date2 = new Date(date.getTime() + (minutoAleatorio2 * 60000));
    try {
        schedule.scheduleJob('verificador1Streamer' + diaAgendamento + horaAgendamento, date, () => __awaiter(void 0, void 0, void 0, function* () {
            (0, armazenaPresencas_js_1.default)(streamerTwitch, date, client);
        }));
    }
    catch (error) {
        console.log(error);
    }
    try {
        schedule.scheduleJob('verificador2Streamer' + diaAgendamento + horaAgendamento, date2, () => __awaiter(void 0, void 0, void 0, function* () {
            (0, armazenaPresencas_js_1.default)(streamerTwitch, date2, client);
        }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = agendaVerificadorPresenca;

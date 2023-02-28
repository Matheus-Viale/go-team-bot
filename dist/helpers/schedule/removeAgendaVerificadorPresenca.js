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
const removeAgendaVerificadorPresenca = (diaAgendamento, horaAgendamento) => __awaiter(void 0, void 0, void 0, function* () {
    const agendamento1Tag = 'verificador1Streamer' + diaAgendamento + horaAgendamento;
    const agendamento2Tag = 'verificador2Streamer' + diaAgendamento + horaAgendamento;
    const agendamento1Criado = schedule.scheduledJobs[agendamento1Tag];
    const agendamento2Criado = schedule.scheduledJobs[agendamento2Tag];
    if (agendamento1Criado) {
        try {
            agendamento1Criado.cancel();
        }
        catch (error) {
            console.log(error);
        }
    }
    if (agendamento2Criado) {
        try {
            agendamento2Criado.cancel();
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.default = removeAgendaVerificadorPresenca;

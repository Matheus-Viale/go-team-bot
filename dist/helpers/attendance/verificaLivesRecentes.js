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
const verificaLivesRecentes = (diasAtras, streamerNickname) => __awaiter(void 0, void 0, void 0, function* () {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - diasAtras);
    dataInicio.setHours(0o0, 0o0, 0o0, 0o0);
    const agendamentos = yield agendamento_js_1.default.find({ createdAt: { $gte: dataInicio } });
    let numeroLives = 0;
    const datasLives = [];
    for (const agendamento of agendamentos) {
        for (let i = 10; i <= 22; i += 2) {
            const horarioTag = 'streamerAgendado' + i;
            if (agendamento[horarioTag] == streamerNickname) {
                numeroLives += 1;
                datasLives.push(agendamento.diaAgendamento);
            }
        }
    }
    const retorno = {
        numeroLives: numeroLives,
        datasLives: datasLives.join(', ')
    };
    return retorno;
});
exports.default = verificaLivesRecentes;

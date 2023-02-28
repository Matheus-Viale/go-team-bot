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
const getRaidStreamer = (streamerNickname, horaAgendamento, dataStringAgendamento) => __awaiter(void 0, void 0, void 0, function* () {
    if (horaAgendamento == 22) {
        return 'ultimo';
    }
    const queryTag = 'streamerAgendado' + (horaAgendamento + 2);
    let agendamentoCriado = yield agendamento_js_1.default.findOne({ diaAgendamento: dataStringAgendamento });
    if (agendamentoCriado[queryTag] == 'nenhum') {
        return agendamentoCriado[queryTag];
    }
    const streamerName = agendamentoCriado[queryTag].split('/')[1];
    return streamerName;
});
exports.default = getRaidStreamer;

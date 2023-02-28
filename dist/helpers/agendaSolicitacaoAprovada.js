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
const agendamento_1 = require("../schemas/agendamento");
const mongoose = require("mongoose");
const agendaMensagemStreamer_1 = require("./schedule/agendaMensagemStreamer");
const agendaVerificadorPresenca_1 = require("./schedule/agendaVerificadorPresenca");
const verificaDias_1 = require("./verificaDias");
function agendaSolicitacaoAprovada(streamerId, streamerNickname, diaStringAgendamento, horaAgendamentoString, client) {
    return __awaiter(this, void 0, void 0, function* () {
        const situacaoAgendamento = (0, verificaDias_1.default)(diaStringAgendamento);
        if (situacaoAgendamento.liberarAgendamento) {
            const dataAgendamento = new Date();
            dataAgendamento.setDate(dataAgendamento.getDate() + situacaoAgendamento.diaAgendamento);
            const diaAgendamento = dataAgendamento.getDate();
            const dataStringAgendamento = dataAgendamento.toLocaleDateString('pt-BR');
            const horaAgendamento = parseInt(horaAgendamentoString.split(':')[0]);
            const streamerTwitch = streamerNickname.split('/')[1];
            let agendamentoCriado = yield agendamento_1.default.findOne({ diaAgendamento: dataStringAgendamento });
            const horarioTag = ('streamerAgendado' + horaAgendamento);
            if (agendamentoCriado) {
                if (agendamentoCriado[horarioTag] != 'nenhum') {
                    return 'OCUPADO';
                }
            }
            else {
                agendamentoCriado = new agendamento_1.default({
                    _id: new mongoose.Types.ObjectId(),
                    createdAt: new Date(),
                    diaAgendamento: dataStringAgendamento
                });
            }
            agendamentoCriado[horarioTag] = streamerNickname;
            yield agendamentoCriado.save().then((novoAgendamento) => __awaiter(this, void 0, void 0, function* () {
                yield (0, agendaMensagemStreamer_1.default)(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, streamerId, streamerNickname, dataStringAgendamento, client);
                yield (0, agendaVerificadorPresenca_1.default)(dataAgendamento, diaAgendamento, horaAgendamento, streamerTwitch, client);
            }));
            return 'SUCESSO';
        }
        return 'INVALIDO';
    });
}
exports.default = agendaSolicitacaoAprovada;

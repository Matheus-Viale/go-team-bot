"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const agendamentoSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    createdAt: { type: Date, expires: 864000, default: new Date() },
    diaAgendamento: { type: String, required: true },
    streamerAgendado10: { type: String, default: 'nenhum' },
    streamerAgendado12: { type: String, default: 'nenhum' },
    streamerAgendado14: { type: String, default: 'nenhum' },
    streamerAgendado16: { type: String, default: 'nenhum' },
    streamerAgendado18: { type: String, default: 'nenhum' },
    streamerAgendado20: { type: String, default: 'nenhum' },
    streamerAgendado22: { type: String, default: 'nenhum' }
});
exports.default = (0, mongoose_1.model)('Agendamento', agendamentoSchema, 'agendamentos');

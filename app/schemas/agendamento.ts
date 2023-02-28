import { Schema, model } from 'mongoose';
const agendamentoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createdAt: {type: Date, expires: 864000, default: new Date()},
    diaAgendamento: {type: String, required: true},
    streamerAgendado10: {type: String, default: 'nenhum'},
    streamerAgendado12: {type: String, default: 'nenhum'},
    streamerAgendado14: {type: String, default: 'nenhum'},
    streamerAgendado16: {type: String, default: 'nenhum'},
    streamerAgendado18: {type: String, default: 'nenhum'},
    streamerAgendado20: {type: String, default: 'nenhum'},
    streamerAgendado22: {type: String, default: 'nenhum'}
});

export default model('Agendamento', agendamentoSchema, 'agendamentos');
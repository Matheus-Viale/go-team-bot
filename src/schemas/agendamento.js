const { Schema, model } = require('mongoose');
const agendamentoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createdAt: {type: Date, expires: 60*60*24*8, default: Date.now()},
    diaAgendamento: {type: String, required: true},
    streamerAgendado10: {type: String, default: 'nenhum'},
    streamerAgendado12: {type: String, default: 'nenhum'},
    streamerAgendado14: {type: String, default: 'nenhum'},
    streamerAgendado16: {type: String, default: 'nenhum'},
    streamerAgendado18: {type: String, default: 'nenhum'},
    streamerAgendado20: {type: String, default: 'nenhum'},
    streamerAgendado22: {type: String, default: 'nenhum'}
});

module.exports = model('Agendamento', agendamentoSchema, 'agendamentos');
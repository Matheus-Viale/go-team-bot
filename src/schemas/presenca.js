const { Schema, model } = require('mongoose');
const presencaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createdAt: {type: Date, expires: 60*60*24*15, default: Date.now()},
    dataDaStream: {type: String, required: true},
    horaDaVerificacao: {type: String, required: true},
    streamer: {type: String, required: true},
    qntdViewers: {type: Number, required: true},
    viewers: Schema.Types.Mixed
});

module.exports = model('Presenca', presencaSchema, 'presencas');
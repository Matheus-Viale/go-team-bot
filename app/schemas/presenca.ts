import { Schema, model } from 'mongoose';
const presencaSchema = new Schema({
    _id: Schema.Types.ObjectId,
    createdAt: {type: Date, expires: 1728000, default: Date.now()},
    dataDaStream: {type: String, required: true},
    horaDaVerificacao: {type: String, required: true},
    streamer: {type: String, required: true},
    qntdViewers: {type: Number, required: true},
    viewers: Schema.Types.Mixed
});

export default model('Presenca', presencaSchema, 'presencas');
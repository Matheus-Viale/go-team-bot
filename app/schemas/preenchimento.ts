import { Schema, model } from 'mongoose';
const preenchimentoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    statusPreenchimento: {type: String, default: 'desativado'}
});

export default model('Preenchimento', preenchimentoSchema, 'preenchimentos');
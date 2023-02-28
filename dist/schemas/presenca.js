"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const presencaSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    createdAt: { type: Date, expires: 1728000, default: Date.now() },
    dataDaStream: { type: String, required: true },
    horaDaVerificacao: { type: String, required: true },
    streamer: { type: String, required: true },
    qntdViewers: { type: Number, required: true },
    viewers: mongoose_1.Schema.Types.Mixed
});
exports.default = (0, mongoose_1.model)('Presenca', presencaSchema, 'presencas');

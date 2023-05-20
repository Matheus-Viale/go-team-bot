"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const preenchimentoSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    statusPreenchimento: { type: String, default: 'desativado' }
});
exports.default = (0, mongoose_1.model)('Preenchimento', preenchimentoSchema, 'preenchimentos');

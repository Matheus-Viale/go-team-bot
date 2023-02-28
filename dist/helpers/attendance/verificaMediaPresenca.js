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
const presenca_js_1 = require("../../schemas/presenca.js");
const verificaMediaPresenca = (diasAtras, streamer) => __awaiter(void 0, void 0, void 0, function* () {
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - diasAtras);
    dataInicio.setHours(0o0, 0o0, 0o0, 0o0);
    const presencas = yield presenca_js_1.default.find({ createdAt: { $gte: dataInicio } });
    let numeroPresenca = 0;
    for (const presenca of presencas) {
        const viewers = Object.values(presenca.viewers);
        const found = yield viewers.find(element => element == streamer.toLowerCase());
        if (found) {
            numeroPresenca += 1;
        }
    }
    const media = Math.floor((numeroPresenca / presencas.length) * 100) + '%';
    const retorno = {
        totalLives: presencas.length,
        presenca: numeroPresenca,
        mediaPresenca: media
    };
    return retorno;
});
exports.default = verificaMediaPresenca;

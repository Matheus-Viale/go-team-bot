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
const schedule = require("node-schedule");
const enviaMensagemAbertura_js_1 = require("../messages/enviaMensagemAbertura.js");
const enviaMensagemAberturaWpp_js_1 = require("../messages/enviaMensagemAberturaWpp.js");
const enviaMensagemFechamento_js_1 = require("../messages/enviaMensagemFechamento.js");
const enviaMensagemFechamentoWpp_js_1 = require("../messages/enviaMensagemFechamentoWpp.js");
const alteraStatusPreenchimento_js_1 = require("../alteraStatusPreenchimento.js");
const agendaAberturaFechamento = (client) => __awaiter(void 0, void 0, void 0, function* () {
    schedule.scheduleJob('mensageAbertura', '0 12 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, enviaMensagemAbertura_js_1.default)(client);
        (0, enviaMensagemAberturaWpp_js_1.default)();
        (0, alteraStatusPreenchimento_js_1.default)('desativado');
    }));
    schedule.scheduleJob('mensagemFechamento', '0 21 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, enviaMensagemFechamento_js_1.default)(client);
        (0, enviaMensagemFechamentoWpp_js_1.default)();
    }));
});
exports.default = agendaAberturaFechamento;

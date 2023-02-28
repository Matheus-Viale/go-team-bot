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
const createScheduleOnReady_js_1 = require("../../helpers/events/createScheduleOnReady.js");
const agendaAberturaFechamento_js_1 = require("../../helpers/schedule/agendaAberturaFechamento.js");
const { agendaLimpezaCanais } = require("../../helpers/schedule/agendaLimpezaCanais.js");
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, agendaAberturaFechamento_js_1.default)(client);
            //startBot(clientWpp);
            (0, createScheduleOnReady_js_1.default)(client);
            //agendaLimpezaCanais(client);
            console.log(`${client.user.tag} está funcionando!`);
        });
    }
};

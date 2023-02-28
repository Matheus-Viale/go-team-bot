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
const clearChannel_1 = require("../clearChannel");
const { channelSolicitacaoAgendamentosStaff, channelMarcarTwitch, channelLiveTwitch } = require('../globalVariables.js');
const agendaLimpezaCanais = (client) => __awaiter(void 0, void 0, void 0, function* () {
    schedule.scheduleJob('limparCanais', '0 30 09 * * *', () => {
        (0, clearChannel_1.default)(client, channelMarcarTwitch);
        (0, clearChannel_1.default)(client, channelLiveTwitch);
    });
});
exports.default = agendaLimpezaCanais;

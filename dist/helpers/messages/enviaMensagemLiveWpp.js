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
const whatsapp_web_js_1 = require("whatsapp-web.js");
const getTwitchAvatar_js_1 = require("../getTwitchAvatar.js");
const botWppInitialize_1 = require("../wpp/botWppInitialize");
const { grupoWpp } = require('../globalVariables.js');
function enviaMensagemLiveWpp(streamer, horario, streamerRaid) {
    return __awaiter(this, void 0, void 0, function* () {
        let streamerAvatar = yield (0, getTwitchAvatar_js_1.default)(streamer);
        if (streamerAvatar == 'sem imagem') {
            streamerAvatar = 'https://i.imgur.com/j1yOXKJ.png';
        }
        const media = yield whatsapp_web_js_1.MessageMedia.fromUrl(streamerAvatar);
        const mensagem = `LIVE AGENDADA:\n\nLINK: https://twitch.tv/${streamer}\n\n⏰ ${horario}:00 às ${horario + 2}:00 ⏰\n\nPróximo Streamer: /raid ${streamerRaid}\n\nINSTRUÇÕES PARA AS LIVES:\n\n1. Não deixe a live mutada!\n2. Lembramos que a presença é feita atráves dos usuários do chat!\n3. Sempre que possível interaja no chat, gentileza gera gentileza!\n4. Não peça follow e afins no chat dos outros, isso incomoda e não dá resultados!\n\nVai deixar em lurk?\nEntão acesse https://autolurk.000webhostapp.com para garantir que sempre estará presentes nas lives e não dependa das Raids!`;
        yield botWppInitialize_1.clientWpp.sendMessage(grupoWpp, media, { caption: mensagem });
    });
}
exports.default = enviaMensagemLiveWpp;

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
exports.startBot = exports.clientWpp = void 0;
const qrcode = require("qrcode-terminal");
const whatsapp_web_js_1 = require("whatsapp-web.js");
exports.clientWpp = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});
function startBot(client) {
    return __awaiter(this, void 0, void 0, function* () {
        exports.clientWpp.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });
        exports.clientWpp.on('ready', () => {
            console.log('Wpp Client está pronto!');
        });
        yield exports.clientWpp.initialize();
    });
}
exports.startBot = startBot;

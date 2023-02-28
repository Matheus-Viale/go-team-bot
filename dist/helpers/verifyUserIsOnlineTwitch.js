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
const axios_1 = require("axios");
const verifyUserIsOnlineTwitch = (streamer) => __awaiter(void 0, void 0, void 0, function* () {
    const apiURL = `https://decapi.me/twitch/uptime/${streamer}`;
    let status = '';
    yield axios_1.default.get(apiURL)
        .then((response) => {
        const data = response.data;
        if (data === `${streamer} is offline`) {
            status = 'offline';
        }
        else if (data == '[Error from Twitch API] 400: Bad Request - Malformed query params.') {
            status = 'inexistente';
        }
        else {
            status = 'online';
        }
    }).catch(error => {
        status = 'inexistente';
    });
    return status;
});
exports.default = verifyUserIsOnlineTwitch;

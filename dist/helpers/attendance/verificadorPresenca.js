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
const verificadorPresenca = (streamerTwitch) => __awaiter(void 0, void 0, void 0, function* () {
    let viewersString = '';
    let viewersArray = [];
    let qntdViewers;
    let status;
    const clientId = '8oi570437s2yiho6a5xqmdlyoivmod';
    const clientSecret = 'z5u0oqnqlcgyvupa4croths1e6jwi2';
    //const refreshToken = '9advo9n6sjtq64o1sxq514o7qq3bhunhb1br3qhwxlocqc59ez'; //horadrage
    //const moderatorId = '39906722'; //horadrage
    const refreshToken = 'c2gvxq9cs9n30n7mzrqe90nbxpcyg6x33v1r89krohgnkqavj5'; //GoTeamStreamers
    const moderatorId = '895048481'; //GoTeamStreamers
    const authRequest = yield axios_1.default.post('https://id.twitch.tv/oauth2/token', new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
        'client_id': clientId,
        'client_secret': clientSecret
    }));
    const acessToken = authRequest.data.access_token;
    const tokenTypeRaw = authRequest.data.token_type;
    const tokenType = tokenTypeRaw.charAt(0).toUpperCase() + tokenTypeRaw.slice(1);
    const tokenAuthHeader = `${tokenType} ${acessToken}`;
    const streamerInfoRequest = yield axios_1.default.get('https://api.twitch.tv/helix/users', {
        params: {
            'login': streamerTwitch.toLowerCase()
        },
        headers: {
            'Authorization': tokenAuthHeader,
            'Client-Id': clientId
        }
    });
    const streamerIdAPI = streamerInfoRequest.data.data[0].id;
    const response = yield axios_1.default.get('https://api.twitch.tv/helix/chat/chatters', {
        params: {
            'broadcaster_id': streamerIdAPI,
            'moderator_id': moderatorId
        },
        headers: {
            'Authorization': tokenAuthHeader,
            'Client-Id': clientId
        }
    }).catch((error => {
        status = error.response.status;
    })).then((response) => {
        if (response) {
            status = response.status;
            qntdViewers = response.data.total;
            const viewers = response.data.data;
            for (const viewer of viewers) {
                viewersArray.push(viewer.user_login);
            }
            viewersString = viewersArray.join(', ');
        }
    });
    return {
        status: status,
        qntdViewers: qntdViewers,
        viewersArray: viewersArray,
        viewersString: viewersString
    };
});
exports.default = verificadorPresenca;

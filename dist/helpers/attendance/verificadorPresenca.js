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
    yield axios_1.default.get(`https://tmi.twitch.tv/group/user/${streamerTwitch.toLowerCase()}/chatters`)
        .then((response) => {
        const data = response.data;
        qntdViewers = data.chatter_count;
        viewersString = data.chatters.vips.join(',  ') + data.chatters.moderators.join(',  ') + data.chatters.viewers.join(',  ');
        viewersArray = data.chatters.vips.concat(data.chatters.moderators).concat(data.chatters.viewers);
    }).catch(err => {
        console.log(err);
    });
    return {
        qntdViewers: qntdViewers,
        viewersArray: viewersArray,
        viewersString: viewersString
    };
});
exports.default = verificadorPresenca;

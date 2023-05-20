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
const verificadorPresenca_js_1 = require("./verificadorPresenca.js");
const presenca_js_1 = require("../../schemas/presenca.js");
const mongoose_1 = require("mongoose");
const { channelListaPresenca } = require('../globalVariables.js');
const armazenaPresencas = (streamerTwitch, data, client) => __awaiter(void 0, void 0, void 0, function* () {
    const retornoVerificadorPresenca = yield (0, verificadorPresenca_js_1.default)(streamerTwitch);
    const channel = yield client.channels.fetch(channelListaPresenca);
    if (retornoVerificadorPresenca.status == 403) {
        const message = `O bot não conseguiu verificar as presenças pois o streamer ${streamerTwitch}, não adicionou o canal goteamstreamers como moderador.`;
        yield channel.send({
            content: message
        }).catch(console.error);
        return;
    }
    if (retornoVerificadorPresenca.status != 200) {
        const message = `O erro ${retornoVerificadorPresenca.status} ocorreu, a equipe de STAFF irá verificar a situação!`;
        yield channel.send({
            content: message
        }).catch(console.error);
        return;
    }
    const viewersArray = retornoVerificadorPresenca.viewersArray;
    const viewersString = retornoVerificadorPresenca.viewersString;
    const qntdViewers = retornoVerificadorPresenca.qntdViewers;
    const dataStream = data.toLocaleDateString('pt-BR');
    const horaVerificação = data.toLocaleTimeString('pt-BR');
    const streamerVerificacao = streamerTwitch;
    const listagemPresenca = new presenca_js_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        createdAt: data,
        dataDaStream: dataStream,
        horaDaVerificacao: horaVerificação,
        streamer: streamerVerificacao,
        qntdViewers: qntdViewers,
    });
    const listaViewers = {};
    for (const [i, viewer] of viewersArray.entries()) {
        const newSchemaTag = 'viewer' + (i + 1);
        listaViewers[newSchemaTag] = viewer;
    }
    listagemPresenca.viewers = listaViewers;
    listagemPresenca.markModified('viewers');
    yield listagemPresenca.save().catch(console.error);
    if (viewersString.length > 3500) {
        const messageSplit = viewersString.match(/.{1,1950}/g);
        yield channel.send({
            content: `Streamer: ${streamerTwitch}\n\nViewers:`
        }).catch(console.error);
        for (const message of messageSplit) {
            yield channel.send({
                content: `${message}`
            }).catch(console.error);
        }
        return;
    }
    channel.send({
        content: `Streamer: ${streamerTwitch}\n\nViewers:\n${viewersString}`
    }).catch(console.error);
});
exports.default = armazenaPresencas;

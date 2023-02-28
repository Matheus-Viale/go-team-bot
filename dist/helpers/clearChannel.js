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
const clearChannel = (client, channel) => __awaiter(void 0, void 0, void 0, function* () {
    const channelSelect = yield client.channels.fetch(channel);
    let messages;
    do {
        messages = yield channelSelect.messages.fetch({ limit: 100 });
        //(channelSelect as GuildTextBasedChannel).bulkDelete(fetched);
        if (messages) {
            for (const message of messages) {
                yield message[1].delete();
            }
        }
    } while (messages.size >= 2);
});
exports.default = clearChannel;

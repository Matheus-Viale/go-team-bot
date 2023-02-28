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
const mysql = require("mysql");
function sqlConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = mysql.createConnection({
            host: 'http://autolurk.000webhostapp.com',
            user: 'id20175199_goteamstreamers',
            password: 'c?bOO)wG3s$3)7(D',
            database: 'id20175199_autolurkdb'
        });
        connection.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        connection.query(`INSERT INTO streamersLurk(dataString, diaSemana, id, streamer10, streamer12, streamer14, streamer16, streamer18, streamer20, streamer22)VALUES(N'10/20/2023',N'Sexta-Feira',N'main',N'diniz',N'dayvson',N'heidkiz',N'veso',N'kosume',N'limipup',N'luuk')`);
        connection.end();
    });
}
exports.default = sqlConnection;

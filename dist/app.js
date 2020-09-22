"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default(); //Inicializar express, modulo de node, para RESTful
app.use(helmet_1.default()); //Seguridad.
app.use(body_parser_1.default.json()); //Respuestas y post en formato json
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default()); //caracteristicas de los apis,bloqueos o accesos
app.use(express_1.default.json()); //Respuestas y post en formato json
routes_1.default(app);
exports.default = app;
//# sourceMappingURL=app.js.map
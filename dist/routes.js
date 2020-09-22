"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const health_controller_1 = __importDefault(require("./controllers/health.controller"));
//variable app de tipo Express
const routes = (app) => {
    app.use('/v1/health', health_controller_1.default);
};
exports.default = routes;
//# sourceMappingURL=routes.js.map
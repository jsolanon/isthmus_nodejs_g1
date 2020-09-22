"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const port = config_1.default.get('port');
const router = express_1.default.Router();
router.get('/', (req, res) => {
    return res.status(200).json({
        server_up: true,
        port: port,
        environment: config_1.default.get('environment')
    });
});
exports.default = router;
//# sourceMappingURL=health.controller.js.map
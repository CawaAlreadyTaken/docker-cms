"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metricsRouter_1 = __importDefault(require("./routes/metricsRouter"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = 3030;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use('/metrics', metricsRouter_1.default);
app.use('/api', apiRouter_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

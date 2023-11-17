"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prom_client_1 = __importDefault(require("prom-client"));
const PostgresConnection_1 = __importDefault(require("../utils/PostgresConnection"));
const router = (0, express_1.Router)();
const register = new prom_client_1.default.Registry();
//register.registerMetric();
router.get('/', async (req, res) => {
    const postgresConnection = await PostgresConnection_1.default.getInstance();
    const query = "select id, name, contest_id, count from tasks inner join (SELECT task_id, COUNT(*) FROM submissions GROUP BY task_id) as subs on tasks.id = subs.task_id;";
    const result = await postgresConnection.query(query, []);
    console.log(result);
    res.set("Content-Type", register.contentType);
    res.send(await register.metrics());
});
exports.default = router;

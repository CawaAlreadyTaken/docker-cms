"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PostgresConnection {
    constructor() {
        this.pool = new pg_1.Pool({
            user: process.env.POSTGRES_USER,
            host: 'localhost',
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: 5432,
        });
        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
        });
    }
    async initialize() {
        this.client = await this.pool.connect();
    }
    static async getInstance() {
        if (!PostgresConnection.instance) {
            PostgresConnection.instance = new PostgresConnection();
            await PostgresConnection.instance.initialize();
        }
        return PostgresConnection.instance;
    }
    async query(sql, params) {
        try {
            const result = await this.client.query(sql, params);
            return result;
        }
        catch (e) {
            console.error(`[!] Error fetching db: ${e}`);
        }
        finally {
            this.client.release();
        }
    }
}
exports.default = PostgresConnection;

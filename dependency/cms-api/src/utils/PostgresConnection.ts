import { Pool, QueryResult } from 'pg';

const HOST_IP = "cms-db";

class PostgresConnection {
  private static instance: PostgresConnection;
  private pool: Pool;
  private client: any;

  private constructor() {
    this.pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: HOST_IP,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });

    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  private async initialize(): Promise<void> {
    this.client = await this.pool.connect();
  }

  public close() {
    this.client.release(true);
  }

  public static async getInstance(): Promise<PostgresConnection> {
    if (!PostgresConnection.instance) {
      PostgresConnection.instance = new PostgresConnection();
      await PostgresConnection.instance.initialize();
    }
    return PostgresConnection.instance;
  }

  async query(sql: string, params?: any[]): Promise<QueryResult> {
    try {
      const result = await this.client.query(sql, params);
      return result;
    } catch (e) {
      console.error(`[!] Error fetching db: ${e}`);
    }
  }


}

export default PostgresConnection;

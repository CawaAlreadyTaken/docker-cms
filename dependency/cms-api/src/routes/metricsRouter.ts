import { Request, Response, Router } from 'express';
import prom_client from 'prom-client';
import PostgresConnection from '../utils/PostgresConnection';

const router = Router();
const register = new prom_client.Registry();
//register.registerMetric();

router.get('/', async (req: Request, res: Response) => {
  const postgresConnection = await PostgresConnection.getInstance();
  const query = "select id, name, contest_id, count from tasks inner join (SELECT task_id, COUNT(*) FROM submissions GROUP BY task_id) as subs on tasks.id = subs.task_id;";
  const result = await postgresConnection.query(query, []);
  console.log(result);
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
});

export default router;


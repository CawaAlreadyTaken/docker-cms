import { Request, Response, Router } from 'express';
import { register, sub_gauge } from "../metrics";
import DB_utils from '../utils/DB_utils';
import { SubmissionInfo } from '../utils/interfaces';

const router = Router();

async function metrics_collector() {
  let subs: SubmissionInfo[] = await DB_utils.getSubmissionsInfo();
  for (let sub of subs) {
    sub_gauge.set({
      id: sub.id,
      name: sub.name,
      contest_id: sub.contest_id
    }, parseInt(sub.count));
  }
}

router.get('/', async (req: Request, res: Response) => {
  await metrics_collector();
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
});

export default router;


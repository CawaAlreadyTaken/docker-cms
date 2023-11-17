import { Request, Response, Router } from 'express';
import DB_utils from '../utils/DB_utils';
import { ContestInfo } from '../utils/interfaces';

const router = Router();

router.get('/contests', async (req: Request, res: Response) => {
  const contestsInfo: ContestInfo[] = await DB_utils.getContestsInfo();
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(contestsInfo));
});

export default router;

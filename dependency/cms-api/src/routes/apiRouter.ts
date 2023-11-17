import { Request, Response, Router } from 'express';
import DB_utils from '../utils/DB_utils';

const router = Router();

router.get('/contests', async (req: Request, res: Response) => {
  const contestsInfo = DB_utils.getContestsInfo();
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(contestsInfo));
});

export default router;

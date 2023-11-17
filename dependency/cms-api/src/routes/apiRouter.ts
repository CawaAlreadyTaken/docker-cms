import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.set("Content-Type", "application/json");
  res.send("test")
});

export default router;


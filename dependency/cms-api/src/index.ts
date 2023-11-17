import express from 'express';
import metricsRouter from './routes/metricsRouter';
import apiRouter from './routes/apiRouter';
import dotenv from 'dotenv';
import DB_utils from './utils/DB_utils';

const app = express();
const port = 3030;
dotenv.config();

app.use(express.json());

app.use('/metrics', metricsRouter);
app.use('/api', apiRouter);

DB_utils.init();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

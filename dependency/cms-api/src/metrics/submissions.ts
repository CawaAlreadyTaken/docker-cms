import { Gauge } from 'prom-client';

export default new Gauge({
  name: "sumbissions",
  help: "sumbission<id, name, contestid> = count",
  labelNames: ['id', 'name', 'contest_id']
});
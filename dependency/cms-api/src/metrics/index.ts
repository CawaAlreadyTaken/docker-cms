import prom_client from 'prom-client';
import sub_gauge from './submissions';

export const register = new prom_client.Registry();
register.registerMetric(sub_gauge);

// metrics export
export { default as sub_gauge } from './submissions';
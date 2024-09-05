import { redis_url } from '../config';
import { createClient } from 'redis';
export const redisClient = createClient({
  url: redis_url,
});

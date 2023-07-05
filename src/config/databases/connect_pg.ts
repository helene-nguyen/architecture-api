//~ Import Debug
import debug from 'debug';
const logger = debug('PoolPG');

//~ Import pg
import pg from 'pg';
// Deployment
// const client = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   only if SSL is enabled on db
//   ssl: { rejectUnauthorized: false }
// });
const client = new pg.Pool();

client
  .connect()
  .then(() => logger('\x1b[1;32m🐘 DB connected\x1b[0m'))
  .catch((err) => logger('\x1b[1;31m DB connection failed\x1b[0m', err));

export default client;
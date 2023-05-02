//~ Dotenv
import 'dotenv/config';

//~ Import Debug
import debug from 'debug';
const logger = debug('EntryPoint');

//~ Import Express
import express from 'express';
const app = express();

//~ Cors
import { corsOptions } from './config/options/cors.js';
app.use(corsOptions);

//~ Session
import session from 'express-session';
import { sessionOptions } from './config/options/session.js';
app.use(session(sessionOptions));
// If you have your node.js behind a proxy and are using secure: true
// you need to set 'trust proxy' in express
// trust first proxy if deploy
app.set('trust proxy', 1);

//~ Encoding parse the body
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//~ Import Routes
import { router } from './domain/core/coreRouter.js';
app.use(router);

//~ Launch Server
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
});

import 'dotenv/config';
import debug from 'debug';
const logger = debug('EntryPoint');
import express from 'express';
const app = express();
import { corsOptions } from './config/options/cors.js';
app.use(corsOptions);
import session from 'express-session';
import { sessionOptions } from './config/options/session.js';
app.use(session(sessionOptions));
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { router } from './domain/core/coreRouter.js';
app.use(router);
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
});
//# sourceMappingURL=index.mjs.map
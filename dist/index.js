import 'dotenv/config';
import express from 'express';
const app = express();
import debug from 'debug';
const logger = debug('EntryPoint');
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.set('trust proxy', 1);
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
});
//# sourceMappingURL=index.js.map
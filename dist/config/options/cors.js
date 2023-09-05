export const corsOptions = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ['http://localhost:5173']);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};
//# sourceMappingURL=cors.js.map
import jwt from 'jsonwebtoken';
import { ErrorApi } from '../resources/services/errorHandling/errorHandler.js';
import debug from 'debug';
const logger = debug('Jwt');
const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader === undefined)
            throw new ErrorApi(req, res, 400, 'No token found !');
        const accessToken = authHeader.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, { user }) => {
            if (err) {
                throw new ErrorApi(req, res, 403, 'The token is invalid!');
            }
            req.user = user;
            req.session.token = accessToken;
            next();
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { validateToken };
//# sourceMappingURL=validateToken.js.map
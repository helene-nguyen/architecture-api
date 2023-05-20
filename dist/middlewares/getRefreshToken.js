import debug from 'debug';
const logger = debug('Jwt');
import { ErrorApi } from '../resources/services/errorHandling/errorHandler.js';
import jwt from 'jsonwebtoken';
function getRefreshToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader === undefined)
            throw new ErrorApi(req, res, 400, 'No token found !');
        let refreshToken = authHeader.split(' ')[1];
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw new ErrorApi(req, res, 403, 'The token is invalid!');
            }
            req.session.refreshToken = [];
            req.user = user.user;
            next();
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { getRefreshToken };
//# sourceMappingURL=getRefreshToken.js.map
import { ErrorApi } from '../resources/services/errorHandling/errorHandler.js';
const auth = (req, res, next) => {
    if (!req.user)
        throw new ErrorApi(req, res, 401, `User not connected !`);
    next();
};
const admin = (req, res, next) => {
    if (req.user?.role !== 'admin')
        throw new ErrorApi(req, res, 403, `You cannot access this info, you're not admin, go away !`);
    next();
};
export { auth, admin };
//# sourceMappingURL=auth.js.map
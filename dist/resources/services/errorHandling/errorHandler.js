import { errorLogger } from './errorLogger.js';
class ErrorApi extends Error {
    constructor(req, res, code = 500, message) {
        super(message);
        res.status(code).json({ message: message });
        errorLogger(message, req, res);
    }
}
export { ErrorApi };
//# sourceMappingURL=errorHandler.js.map
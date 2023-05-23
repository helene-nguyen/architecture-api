import Ajv from 'ajv';
const ajv = new Ajv();
import { ErrorApi } from '../resources/services/errorHandling/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
const validate = (schemaCustom) => {
    return function validateCheck(req, res, next) {
        const validate = ajv.compile(schemaCustom);
        if (validate(req.body)) {
            next();
        }
        else {
            logger(validate.errors);
            throw new ErrorApi(req, res, 400, 'Data not valid');
        }
    };
};
export { validate };
//# sourceMappingURL=validateSchema.js.map
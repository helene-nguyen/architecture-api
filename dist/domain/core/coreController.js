import debug from 'debug';
const logger = debug('Controller');
class CoreController {
    model;
    paramsId;
    createSuccessful = `Successfully created!`;
    updateSuccessful = 'Informations successfully updated!';
    deleteSuccessful = 'Informations successfully deleted!';
    create = async (req, res) => {
        try {
            const bodyData = req.body;
            await this.model.createOneItem(bodyData);
            return res.status(201).json(this.createSuccessful);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    fetchAll = async (req, res) => {
        try {
            const data = await this.model.findAllItems();
            return res.status(200).json(data);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    fetchOne = async (req, res) => {
        try {
            const id = +req.params[this.paramsId];
            const data = await this.model.findOneItem(id);
            return res.status(200).json(data);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    update = async (req, res) => {
        try {
            const bodyData = req.body;
            await this.model.updateOneItem(bodyData);
            return res.status(200).json(this.updateSuccessful);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    delete = async (req, res) => {
        try {
            const id = +req.params[this.paramsId];
            await this.model.deleteOneItem(id);
            return res.status(200).json(this.deleteSuccessful);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
}
export { CoreController };
//# sourceMappingURL=coreController.js.map
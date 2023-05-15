import debug from 'debug';
const logger = debug('Controller');
class CoreController {
    updateSuccessful = 'Informations successfully updated !';
    create = async () => { };
    fetchAll = async (req, res) => {
        try {
            const data = await this.model.findAll();
            return res.status(200).json(data);
        }
        catch (err) {
            if (err instanceof Error)
                logger(err.message);
        }
    };
    fetchOne = async (id) => { };
    update = async () => { };
    delete = async (id) => { };
}
export { CoreController };
//# sourceMappingURL=coreController.js.map
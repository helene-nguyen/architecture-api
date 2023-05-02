import debug from 'debug';
const logger = debug('Controller');
const renderHomePage = (req, res) => {
    try {
        res.json({
            message: 'Welcome to Yumedo API',
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { renderHomePage };
//# sourceMappingURL=controller.js.map
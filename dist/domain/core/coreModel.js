class CoreModel {
    notFoundMsg = 'Item not found!';
    notValidMsg = 'Given informations not valid';
    forbiddenMsg = 'Given informations not allows any modification';
    badRequestMsg = 'You cannot access this info, go away !';
    findAll = async () => {
        const result = await this.data.selectAll();
        if (!result)
            return null;
        return result;
    };
}
export { CoreModel };
//# sourceMappingURL=coreModel.js.map
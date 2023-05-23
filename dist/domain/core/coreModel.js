class CoreModel {
    notFoundMsg = 'Item not found!';
    notValidMsg = 'Given informations not valid.';
    forbiddenMsg = 'Given informations not allows any modification.';
    badRequestMsg = 'You cannot access this info, go away!';
    createOneItem = async (bodyData) => {
        const result = await this.data.insert(bodyData);
        if (!result)
            return null;
        return result;
    };
    findAllItems = async () => {
        const result = await this.data.selectAll();
        if (!result)
            return null;
        return result;
    };
    findOneItem = async (id) => {
        const idChecked = Number(id);
        const result = await this.data.selectOne(idChecked);
        if (!result)
            return null;
        return result;
    };
    updateOneItem = async (bodyData) => {
        const result = await this.data.update(bodyData);
        if (!result)
            return null;
        return result;
    };
    deleteOneItem = async (id) => {
        const result = await this.data.delete(id);
        if (!result)
            return null;
        return result;
    };
}
export { CoreModel };
//# sourceMappingURL=coreModel.js.map
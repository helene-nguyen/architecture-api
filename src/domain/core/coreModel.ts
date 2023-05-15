interface CoreModel {
  data: any;
}
class CoreModel {
  notFoundMsg: string = 'Item not found!';
  notValidMsg: string = 'Given informations not valid';
  forbiddenMsg: string = 'Given informations not allows any modification';
  badRequestMsg: string = 'You cannot access this info, go away !';

  findAll = async () => {
    const result = await this.data.selectAll();
    if (!result) return null;
    return result;
  };

  //! Check methods
}

export { CoreModel };

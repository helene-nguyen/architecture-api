//~ Import modules
import { ICoreModel, IData } from './Types';

class CoreModel implements ICoreModel {
  data: IData;

  notFoundMsg: string = 'Item not found!';
  notValidMsg: string = 'Given informations not valid.';
  forbiddenMsg: string = 'Given informations not allows any modification.';
  badRequestMsg: string = 'You cannot access this info, go away!';

  createOneItem = async (bodyData: Object) => {
    const result = await this.data.insert(bodyData);
    if (!result) return null;

    return result;
  };

  findAllItems = async () => {
    const result = await this.data.selectAll();
    if (!result) return null;

    return result;
  };

  findOneItem = async (id: number) => {
    const idChecked = Number(id);
    const result = await this.data.selectOne(idChecked);
    if (!result) return null;

    return result;
  };

  updateOneItem = async (bodyData: Object) => {
    const result = await this.data.update(bodyData);
    if (!result) return null;

    return result;
  };

  deleteOneItem = async (id: number) => {
    const result = await this.data.delete(id);
    if (!result) return null;

    return result;
  };
}

export { CoreModel };

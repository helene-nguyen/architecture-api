//~ Import modules
import { ICoreRepository, IData } from "./Types";

class CoreRepository implements ICoreRepository {
  dataRepository: IData;

  //& Create
  insert = async (inputData: object) => {
    const result = await this.dataRepository.insert(inputData);
    return result;
  };

  //& SelectAll
  selectAll = async () => {
    const result = await this.dataRepository.selectAll();
    return result;
  };

  //& SelectOne
  selectOne = async (id: number | undefined) => {
    const result = await this.dataRepository.selectOne(id);
    return result;
  };

  //& Update
  update = async (inputData: object) => {
    const result = await this.dataRepository.update(inputData);
    return result;
  };

  //& Delete
  delete = async (id: number) => {
    const result = await this.dataRepository.selectOne(id);
    return result;
  };
}

export { CoreRepository };

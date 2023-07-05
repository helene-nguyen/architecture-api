export interface IData {
  insert: Function;
  selectAll: Function;
  selectOne: Function;
  update: Function;
  delete: Function;
}

export interface ICoreRepository {
  insert(inputData: object): Promise<string[] | undefined>;
  selectAll(): Promise<string[] | undefined>;
  selectOne(id: number): Promise<string[] | undefined>;
  update(inputData: object): Promise<string[] | undefined>;
  delete(id: number): Promise<number | undefined>;
}

export interface ICoreModel {
  createOneItem(inputData: object): Promise<string[] | undefined>;
  findAllItems(): Promise<string[] | undefined>;
  findOneItem(id: number): Promise<string[] | undefined>;
  updateOneItem(inputData: object): Promise<string[] | undefined>;
  deleteOneItem(id: number): Promise<number | undefined>;
}

export interface ICoreController {
  create: Function;
  fetchAll: Function;
  fetchOne: Function;
  update: Function;
  delete: Function;
}

export interface IModel {
  findAllItems: Function;
  findOneItem: Function;
  createOneItem: Function;
  updateOneItem: Function;
  deleteOneItem: Function;
}

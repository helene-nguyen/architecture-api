//~ Import modules
import { ObjectId, MongoClient } from 'mongodb';

class MongoCoreDataMapper {
  client: object;
  collectionName: string;
  dbName: string = process.env.MONGO_DB_NAME!;

  constructor(client: object) {
    this.client = client;
  }

  //* METHODS
  //& Create
  insert = async (inputData: object) => {};

  //& SelectAll
  selectAll = async () => {
    if (this.client instanceof MongoClient) {
      const db = this.client.db(this.dbName);

      const collection = db.collection(this.collectionName);

      const result = await collection.find().toArray();

      return result;
    }
  };

  //& SelectOne
  selectOne = async (id: number | undefined) => {};

  //& Update
  update = async (inputData: object) => {};

  //& Delete
  delete = async (id: number) => {};
}

export { MongoCoreDataMapper };

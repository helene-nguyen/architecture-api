//~ Import modules
import client from '../../../config/databases/connect_mongo.js';
import { MongoCoreDataMapper } from '../../core/coreDatamappers/mongo.coreDatamapper.js';

class MongoUserDataMapper extends MongoCoreDataMapper {
    collectionName = 'user';
}

const MongoUserData = new MongoUserDataMapper(client);
export { MongoUserData };
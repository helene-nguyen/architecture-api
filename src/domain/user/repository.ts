//~ Import module
import { CoreRepository } from '../core/coreRepository.js';
import { PGUserData } from './datamappers/pg.datamapper.js';
import { MongoUserData } from './datamappers/mongo.datamapper.js';

class UserRepository extends CoreRepository {
    dataRepository = PGUserData;
    mongoData = MongoUserData;

  //& Find user by email
  findUserIdentity = async (username: string, email: string) => {
    const userIdentity = await this.dataRepository.findUserIdentity(username, email);

    return userIdentity;
  };
}

const UserData = new UserRepository();
export { UserData };

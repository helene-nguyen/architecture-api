import client from '../../config/database/connect.js';
import { CoreDataMapper } from '../core/coreDatamapper.js';
class UserDataMapper extends CoreDataMapper {
    tableName = 'user';
    columns = ` "id", "role_id", "username", "first_name", "last_name", "avatar", "email", "password"`;
}
const UserData = new UserDataMapper(client);
export { UserData };
//# sourceMappingURL=datamapper.js.map
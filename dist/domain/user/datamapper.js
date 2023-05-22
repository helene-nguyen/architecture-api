import pg from 'pg';
import client from '../../config/database/connect.js';
import { CoreDataMapper } from '../core/coreDatamapper.js';
class UserDataMapper extends CoreDataMapper {
    tableName = 'user';
    columns = ` "id", "role_id", "username", "first_name", "last_name", "avatar", "email", "password"`;
    createFunctionName = 'create_user';
    updateFunctionName = 'update_user';
    userIdentity = 'user_identity';
    findUserIdentity = async (username, email) => {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `
                SELECT * FROM "${this.userIdentity}"($1, $2);
                `,
                values: [username, email],
            };
            const result = await this.client.query(preparedQuery);
            return result.rows[0];
        }
    };
}
const UserData = new UserDataMapper(client);
export { UserData };
//# sourceMappingURL=datamapper.js.map
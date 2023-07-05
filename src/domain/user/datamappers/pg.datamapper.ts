//~ Import modules
import pg from 'pg';
import client from '../../../config/databases/connect_pg.js';
import { PGCoreDataMapper } from '../../core/coreDatamappers/pg.coreDatamapper.js';

class PGUserDataMapper extends PGCoreDataMapper {
  tableName = 'user';
  columns = ` "id", "role_id", "username", "first_name", "last_name", "avatar", "email", "password"`;

  createFunctionName = 'create_user';
  updateFunctionName = 'update_user';
  userIdentity = 'user_identity';

  //& Find user by email
  findUserIdentity = async (username:string, email: string) => {
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
  }
}

const PGUserData = new PGUserDataMapper(client);
export { PGUserData };
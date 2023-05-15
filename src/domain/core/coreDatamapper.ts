import pg from 'pg';

interface CoreDataMapper {
  client: object;
  tableName: string;
  columns: string;

  createFunctionName: string;
  updateFunctionName: string;
}

class CoreDataMapper {
  constructor(client: object) {
    this.client = client;
  }

  //& Create
  insert = async (inputData: object) => {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM ${this.createFunctionName}($1);`,
        values: [inputData],
      };

      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  };
  //& SelectAll
  selectAll = async () => {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `
                    SELECT ${this.columns}
                    FROM "${this.tableName}"
                    ORDER BY "id";`,
      };

      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  };

  //& SelectOne
  selectOne = async (id: number | undefined) => {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `
                    SELECT ${this.columns} 
                    FROM "${this.tableName}"
                    WHERE "id" = $1;
                    `,
        values: [id],
      };

      const result = await this.client.query(preparedQuery);

      if (!result.rows[0]) return null;

      return result.rows[0];
    }
  };

  //& Update
  update = async (inputData: object) => {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM ${this.updateFunctionName}($1);`,
        values: [inputData],
      };
      const result = await this.client.query(preparedQuery);

      return result.rowCount;
    }
  };

  //& Delete
  delete = async (id: number) => {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `
                        DELETE FROM "${this.tableName}"
                        WHERE "id" = $1;
                        `,
        values: [id],
      };

      const result = await this.client.query(preparedQuery);

      return result.rowCount;
    }
  };
}

export { CoreDataMapper };

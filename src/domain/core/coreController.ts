import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');

interface CoreController {
  model: { findAll: Function };
}

class CoreController {
  updateSuccessful: string = 'Informations successfully updated !';
  //& Create
  create = async () => {};

  //& SelectAll
  fetchAll = async (req: Request, res: Response) => {
    try {
      const data = await this.model.findAll();
      //~ Result
      return res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  //& SelectOne
  fetchOne = async (id: number | undefined) => {};

  //& Update
  update = async () => {};

  //& Delete
  delete = async (id: number | undefined) => {};
}

export { CoreController };

//~ Import modules
import { Request, Response } from 'express';
import debug from 'debug';
const logger = debug('Controller');

interface CoreController {
  model: {
    findAllItems: Function;
    findOneItem: Function;
    createOneItem: Function;
  };

  paramsId: string;
}

class CoreController {
  createSuccessful: string = `Successfully created!`;
  updateSuccessful: string = 'Informations successfully updated!';

  //& Create
  create = async (req: Request, res: Response) => {
    try {
      const bodyData = req.body;
      await this.model.createOneItem(bodyData);

      return res.status(201).json(this.createSuccessful);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  //& SelectAll
  fetchAll = async (req: Request, res: Response) => {
    try {
      const data = await this.model.findAllItems();
      //~ Result
      return res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  //& SelectOne
  fetchOne = async (req: Request, res: Response) => {
    try {
      const id = +req.params[this.paramsId];

      const data = await this.model.findOneItem(id);
      //~ Result
      return res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) logger(err.message);
    }
  };

  //& Update
  update = async () => {};

  //& Delete
  delete = async (id: number | undefined) => {};
}

export { CoreController };

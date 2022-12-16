import * as express from 'express';
import { Part } from '../models/interfaces';
import * as PartModel from '../models/partModel';
import { partsSchema } from '../schemas/';

interface PartsListQuery extends express.Request {
  query: {
    offset?: string;
    limit?: string;
  };
}

export async function get(req: express.Request, res: express.Response) {
  res.json(await PartModel.retrieve(req.params.id));
}

export async function getList(req: PartsListQuery, res: express.Response) {
  const offset: number = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit: number = req.query.limit ? parseInt(req.query.limit) : 100;
  res.json(await PartModel.retrieveAll(offset, limit));
}

export async function remove(req: express.Request, res: express.Response) {
  //TODO:: delete associated docs ?
  res.json(await PartModel.del(req.body.ids));
}

export async function create(req: express.Request, res: express.Response) {
  //sanitize part data
  const data = partsSchema.validate(req.body);
  if (data.error) return res.status(400).send(data.error.message);

  res.status(201).json(
    await PartModel.create({
      name: req.body.name,
      desc: req.body.desc,
      tags: req.body.tags,
      packages: req.body.packages,
    })
  );
}

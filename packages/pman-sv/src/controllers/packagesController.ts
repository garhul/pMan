import * as PackageModel from '../models/packageModel';
import * as express from 'express';
import { packageSchema } from '../schemas/index';

interface PackagesListQuery extends express.Request {
  query: {
    offset?: string;
    limit?: string;
  };
}

export async function create(req: express.Request, res: express.Response) {
  const data = packageSchema.validate(req.body);
  if (data.error) return res.status(400).send(data.error.message);
  res.status(201).json(await PackageModel.create(data.value.name));
}

export async function get(req: express.Request, res: express.Response) {
  res.json(await PackageModel.retrieve(req.params.id));
}

export async function getList(req: PackagesListQuery, res: express.Response) {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;

  res.json(await PackageModel.retrieveAll(limit, offset));
}

export async function remove(req: express.Request, res: express.Response) {
  res.json(await PackageModel.del(req.body.ids));
}

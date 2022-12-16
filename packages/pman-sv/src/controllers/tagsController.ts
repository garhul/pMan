import * as express from 'express';
import * as TagModel from '../models/tagModel';
import { tagSchema } from '../schemas/index';

interface TagListQuery extends express.Request {
  query: {
    offset?: string;
    limit?: string;
  };
}

export async function create(req: express.Request, res: express.Response) {
  const data = tagSchema.validate(req.body);

  if (data.error) return res.status(400).send(data.error.message);

  res.status(201).json(await TagModel.create(data.value.name));
}

export async function get(req: express.Request, res: express.Response) {
  res.json(await TagModel.retrieve(req.params.id));
}

export async function getList(req: TagListQuery, res: express.Response) {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  res.json(await TagModel.retrieveAll(limit, offset));
}

export async function remove(req: express.Request, res: express.Response) {
  res.json(await TagModel.del(req.body.ids));
}

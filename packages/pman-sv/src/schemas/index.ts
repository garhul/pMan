import * as Joi from 'joi';

export const tagSchema = Joi.object({
  name: Joi.array().items(Joi.string().required().min(2).max(20)),
});

export const packageSchema = Joi.object({
  name: Joi.array().items(Joi.string().required().min(2).max(20)),
});

export const docSchema = Joi.object({
  name: Joi.string().required().min(2).max(40),
  filePath: Joi.string().required().min(2).max(1024),
  docType: Joi.string().required().min(2).max(1024)
});

export const partsSchema = Joi.object({
  name: Joi.string().required().min(2).max(40),
  desc: Joi.string().required().min(2).max(1024),
  tags: Joi.array().items(Joi.string().min(2).max(20)),
  packages: Joi.array().items(Joi.string().min(2).max(20)),
});

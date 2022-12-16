import { Prisma } from '@prisma/client';
import PrismaCli from '../services/prisma';
import { Tag, BatchPayload } from './interfaces';


function formatOutput(data: Prisma.TagGetPayload<{include :{parts:true}}>) : Tag {
  return {
    id: data.id,
    createdAt: data.createdAt,
    name: data.name,
    parts: data.parts.map(part => ({id: part.id, name: part.name, desc: part.name}))
  } as Tag;
}

export async function create(names: string[]): Promise<BatchPayload> {
  const retval = await PrismaCli.tag.createMany({
    data: names.map((name) => ({ name: name.toUpperCase() })),
  });
  return retval;
}

export async function retrieveAll(limit: number, offset: number): Promise<Tag[]> {
  const retVal = await PrismaCli.tag.findMany({
    take: limit,
    skip: offset,
    include: { parts: true },
  });
  
  return retVal.map(val => formatOutput(val)) as Tag[];
}

export async function retrieve(id: string): Promise<Tag> {
  return formatOutput(await PrismaCli.tag.findUnique({ where: { id }, include: {parts:true} }));
}

export async function del(ids: string[]): Promise<BatchPayload> {
  if (ids.length === 0) return { count: 0 } as BatchPayload;
  return PrismaCli.tag.deleteMany({ where: { id: { in: ids } } });
}

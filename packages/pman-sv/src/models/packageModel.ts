import { Prisma } from '@prisma/client';
import PrismaCli from '../services/prisma';
import { Package, BatchPayload } from './interfaces';

function formatOutput(data: Prisma.PackageGetPayload<{include:{ parts:boolean, docs:boolean }}>): Package {
  return {
    id: data.id,
    name: data.name,
    parts: data.parts.map(part => ({ id: part.id, name: part.name, desc: part.desc })),
    docs: data.docs.map(doc => ({id: doc.id, name:doc.name, path:doc.filePath}))
  }
}

export async function create(names: string[]): Promise<BatchPayload> {
  return PrismaCli.package.createMany({
    data: names.map((name) => ({ name: name.toUpperCase() })),
  });
}

export async function retrieveAll(limit: number, offset: number): Promise<Package[]> {
  const retval = await PrismaCli.package.findMany({ take: limit, skip: offset, include:{ docs:true, parts:true }});
  return retval.map(val => formatOutput(val));  
}

export async function retrieve(id: string): Promise<Package> {
  const data = await PrismaCli.package.findUnique({
    where: { id },
    include: { parts:true, docs: true },
  });

  return formatOutput(data);
}

export async function del(ids: string[]): Promise<BatchPayload> {
  if (ids.length === 0) return { count: 0 } as BatchPayload;
  return PrismaCli.package.deleteMany({ where: { id: { in: ids } } });
}

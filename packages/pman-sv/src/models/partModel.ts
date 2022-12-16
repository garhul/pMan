import PrismaCli from '../services/prisma';
import { Prisma } from '@prisma/client'
import { Part, BatchPayload, DocType } from './interfaces';
 
function parseOutput(data: Prisma.PartGetPayload<{ include: { tags:boolean, packages:boolean, docs:boolean } }>): Part{
  return {
    id: data.id,
    createdAt: data.createdAt,
    name: data.name,
    desc: data.desc,
    tags: data.tags.map(tag => ({id: tag.id, name: tag.name})),
    packages: data.packages.map(pkg => ({id: pkg.id, name: pkg.name})),
    docs: data.docs.map(doc => ({id: doc.id, name: doc.name, path: doc.filePath})),
  } as Part;
}

export async function create(part): Promise<Part> {
  const retval = await PrismaCli.part.create({
    data: {
      name: part.name,
      desc: part.desc,
      tags: {
        connectOrCreate: part.tags.map((tag: string) => ({
          create: {name: tag},
          where : {name: tag}
          }))
        },
      packages: {
        connectOrCreate: part.packages.map((pkg: string) => ({
          create: {name: pkg},
          where : {name: pkg}
        }))
      }
    },
    include: {
      tags: true,
      packages: true, 
      docs: true
    },
  });
  
  return parseOutput(retval);
}

export async function retrieveAll(offset: number,limit: number): Promise<Part[]> {
  const retVal = await PrismaCli.part.findMany({
    take: limit,
    skip: offset,
    include: {
      docs: true,
      tags: true,
      packages: true,
    },
  });
  
  return retVal.map(parseOutput);
}

export async function retrieve(id: string): Promise<Part> {
  const retVal = await PrismaCli.part.findUnique(
    { 
      where: { id },
      include: {
        docs: true,
        tags: true,
        packages: true,
    } 
  });
  
  return parseOutput(retVal);
}

export async function del(ids: string[]): Promise<BatchPayload> {
  if (ids.length === 0) return { count: 0 } as BatchPayload;
  
  return( await PrismaCli.part.deleteMany({ where: { id: { in: ids } } }));  
}

// export async function update(partData): Promise<Part> {
//   return {}
// }
import { Prisma } from '@prisma/client';
import PrismaCli from '../services/prisma';
import { Doc, DocType, BatchPayload } from './interfaces';
import {getPresignedUrl} from '../services/docStorage/';
// import {services}

function formatOutput(data: Prisma.DocGetPayload<{include:{part:boolean, package:boolean}}>) : Doc {
  if (!(data.type in DocType))
    throw new Error(`data.type ${data.type} not present in DocType enum`);
  
  const retVal: Doc =  {
    id: data.id,
    createdAt: data.createdAt,
    path: data.filePath,
    name: data.name,
    type: data.type as DocType
  };
  
  if (data.part) retVal.part = { id: data.part.id, name: data.part.name, desc: data.part.desc }
  if (data.package) retVal.package = { id: data.package.id, name: data.package.name }
  
  return retVal as Doc;
}

export async function create({name: string, }): Promise<Doc & {uploadUrl:string}> {
  
  const retval = await PrismaCli.Doc.create({
    name:
  });
  
  
  return retval;
}




// export async function retrieveAll(limit: number, offset: number): Promise<Tag[]> {
//   const retVal = await PrismaCli.tag.findMany({
//     take: limit,
//     skip: offset,
//     include: { parts: true },
//   });
  
//   return retVal.map(val => formatOutput(val)) as Tag[];
// }

// export async function retrieve(id: string): Promise<Doc> {
//   return formatOutput(await PrismaCli.doc.findUnique({ where: { id }}));
// }

export async function del(ids: string[]): Promise<BatchPayload> {
  //remove all associations to this document

  if (ids.length === 0) return { count: 0 } as BatchPayload;
  return PrismaCli.doc.deleteMany({ where: { id: { in: ids } } });
}

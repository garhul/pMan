const parts = [];

interface tags {
  name:string,
}

interface Packaging {
  name:string,
}

interface Part {
  id: string,
  name: string,
  description: string,
  tags: tags[] | null,
  packaging : Packaging[]| null,
  docs: Doc[],
}

enum DocType {
  pinout,
  datasheet,
  diagram,
  other
}

interface Doc {
  id: number,
  name: string,
  type: DocType,
  path: string,
}

export function getList() :Promise <Part[]> {
  return Promise.resolve(parts);
}

export function remove(id:number, delteAssociatedDocs = true ) {
  //todo check for permissions
  return null;


}

export function add(partData) {
  //sanitize part data

  //if data is correct then add it to the db
  
  //and return created object data
  
}
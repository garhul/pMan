export interface Tag {
  id: string;
  createdAt: Date;
  name: string;
  parts: SimplifiedPart[];
}

export interface SimplifiedPart { id:string, name: string, desc:string };
export interface SimplifiedTag { id:string, name: string};
export interface SimplifiedPackage {id: string, name: string};
export interface SimplifiedDoc {id: string, name:string, path:string}

export interface Package {
  id: string;
  name: string;
  parts : SimplifiedPart[];
  docs: SimplifiedDoc[];
}

export enum DocType {
  pinout = "pinout",
  datasheet = "datasheet",
  diagram = "diagram",
  other = "other",
}

export interface Doc {
  id: string;
  createdAt: Date;
  name: string;
  type: DocType;
  path: string;
  package?: SimplifiedPackage,
  part?: SimplifiedPart
}

export interface Part {
  id: string;
  createdAt: Date;
  name: string;
  desc: string;
  tags: SimplifiedTag[];
  packages: SimplifiedPackage[];
  docs: SimplifiedDoc[];
}

export type BatchPayload = {
  count: number;
};

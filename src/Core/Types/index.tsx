export type Adapter = {
  name: string;
  id: string;
  icon: string;
  description: string;
  version: string;
  files: ObjectFileSystem;
};

type ObjectFileSystem = {
  [fileName: string]: string;
};

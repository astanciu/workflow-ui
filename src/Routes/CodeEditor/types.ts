import * as T from 'Core/Types';

export type Props = {
  adapter: T.Adapter;
};

export type OpenFile = {
  fileName: string;
  code: string;
};

export type State = {
  activeFile?: string;
  openFiles: OpenFile[];
  adapter: T.Adapter;
};

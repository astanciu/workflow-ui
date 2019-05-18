import { Connection, Node } from 'Models';

export type ReduxState = {
  showPanel: boolean;
  nodes: Node[];
  selectedNode: Node | null;
  connections: Connection[];
  selectedConnection: Connection | null;
  loading: boolean;
  error: Error | null;
  user: any;
  adapters: any[];
};

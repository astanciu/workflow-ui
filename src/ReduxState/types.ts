import { Node, Connection } from 'Models';

export type ReduxState = {
  ready: boolean;
  nodes: Node[];
  selectedNode: Node | null;
  connections: Connection[];
  selectedConnection: Connection | null;
  loading: boolean;
  error: Error | null;
  user: any;
};

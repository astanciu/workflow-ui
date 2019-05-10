import isEqual from 'lodash-es/isEqual';
import { Node, Connection } from 'Models';

export const processWorkflow = (state, { workflow }) => {
  const nodes = workflow.nodes.map((node) => new Node(node)) as Node[];

  const connections = workflow.connections.map((conn) => {
    const fromNode = nodes.find((n) => n.id === conn.from);
    const toNode = nodes.find((n) => n.id === conn.to);

    if (fromNode && toNode) {
      return new Connection(fromNode, toNode, conn.id);
    }
    return null;
  }) as Connection[];

  return {
    ...state,
    nodes,
    connections,
    loading: false,
    error: null,
  };
};

export const updateNode = (state, action) => {
  let node = action.node as Node;
  let posChanged = false;
  const nodes = state.nodes.map((n: Node) => {
    if (n.id === node.id) {
      posChanged = !isEqual(n.position, node.position);
      return node;
    } else {
      return n;
    }
  });

  if (posChanged) {
    const connections = state.connections.map((conn) => {
      if (conn.from.id === node.id) {
        const newConn = conn.clone();
        newConn.from = node;
        return newConn;
      }
      if (conn.to.id === node.id) {
        const newConn = conn.clone();
        newConn.to = node;
        return newConn;
      }
      return conn;
    });
    return { ...state, nodes, connections };
  } else {
    return { ...state, nodes };
  }
};

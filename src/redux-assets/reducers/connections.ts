import produce from 'immer';
import { Connection } from 'Models';
import * as A from '../actions';
import { ReduxState } from '../types';

export const createConnection = produce((draft: ReduxState, action) => {
  const { fromNode, toNode } = action;
  const exists = draft.connections.find((c) => c.from.id === fromNode.id && c.to.id === toNode.id);
  if (exists) return;

  draft.connections.push(new Connection(fromNode, toNode));
});

export const removeConnection = (state: ReduxState, action) => {
  return produce(state, (draft) => {
    const connection = action.connection;
    draft.connections = draft.connections.filter((c) => c.id !== connection.id);
  });
};

export const connectionReducers = (state, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case A.REMOVE_CONNECTION:
        const connection = action.connection;
        draft.connections = state.connections.filter((c) => c.id !== connection.id);
        break;
      case A.CREATE_CONNECTION:
        const { fromNode, toNode } = action;
        const exists = state.connections.find((c) => c.from.id === fromNode.id && c.toNode.id === toNode.id);
        if (exists) return;

        draft.connections.push(new Connection(fromNode, toNode));
        break;
      default:
        return state;
    }
  });

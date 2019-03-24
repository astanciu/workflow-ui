import { combineReducers } from 'redux';
import { Node, Connection } from '../../models';
import * as A from '../actions';
import * as Types from '../types';
import { processWorkflow, updateNode } from './nodes';
import { removeConnection, createConnection } from './connections';

export const getReducer = (initialState: Types.ReduxState) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    // Workflow
    case A.LOAD_WORKFLOW_BEGIN:
      return { ...state, loading: true, error: null };
    case A.LOAD_WORKFLOW_SUCCESS:
      return processWorkflow(state, action);
    case A.LOAD_WORKFLOW_ERROR:
      return { ...state, loading: false, error: action.error };

    // Connections
    case A.SELECT_CONNECTION:
      return { ...state, selectedConnection: action.connection };
    case A.REMOVE_CONNECTION:
      return removeConnection(state, action);
    case A.CREATE_CONNECTION:
      return createConnection(state, action);

    // Nodes
    case A.SELECT_NODE:
      return { ...state, selectedNode: action.node };
    case A.UPDATE_NODE:
      return updateNode(state, action);

    default:
      return state;
  }
};

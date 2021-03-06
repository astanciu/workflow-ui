// @ts-nocheck
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import * as A from '../actions';
import { adaptersReducer } from '../adapters/reducer';
import * as Types from '../types';
import { createConnection, removeConnection } from './connections';
import { processWorkflow, updateNode } from './nodes';

const initialState: Types.ReduxState = {
  showPanel: true,
  nodes: [],
  selectedNode: null,
  connections: [],
  selectedConnection: null,
  loading: true,
  error: null,
  user: null,
  adapters: [],
};

export const createRootReducer = (history: History): Reducer<any> => {
  const combined = combineReducers({
    router: connectRouter(history),
    app: reducer,
    adapters: adaptersReducer,
  });

  return combined;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case A.SHOW_SIDE_PANEL:
      return { ...state, showPanel: action.visible };

    // Login
    case A.LOGIN_CALLBACK:
      return { ...state, error: null, user: null };
    case A.LOGIN_SUCCESS:
      return { ...state, error: null, user: action.user };
    case A.LOGIN_ERROR:
      return { ...state, error: action.error, user: null };
    case A.LOGOUT_SUCCESS:
      return { ...state, error: null, user: null };

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

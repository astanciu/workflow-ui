import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as Types from './types';
import { getReducer } from './reducers/index';

const initialState: Types.ReduxState = {
  nodes: [],
  selectedNode: null,
  connections: [],
  selectedConnection: null,
  loading: true,
  error: null
};

const reducer = getReducer(initialState);

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createRootReducer } from './reducers/index';

const history = createBrowserHistory();
const reducer = createRootReducer(history);
const middleware = [routerMiddleware(history), thunk];

const store = createStore(reducer, {}, composeWithDevTools({ trace: false })(applyMiddleware(...middleware)));

if (process.env.NODE_ENV !== 'production') {
  //@ts-ignore
  if (module.hot) {
    //@ts-ignore
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducer);
    });
  }
}

export { store, history };

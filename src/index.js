import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import './styles/flatly.bootstrap.css';
// import './styles/custom.scss';
// import './styles/theme/bootstrap.css'
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

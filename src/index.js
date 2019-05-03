import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './Root';
import { store, history } from './redux-assets/index';
import './styles/flatly.bootstrap.css';
import './styles/custom.scss';
import './index.css';

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));

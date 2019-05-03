import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './Root';
import { store, history } from 'ReduxState/index';
import './styles/flatly.bootstrap.css';
import './styles/custom.scss';
import './styles/index.css';

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './Root';
import { store, history } from 'ReduxState/index';
import './styles/index.scss';

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));

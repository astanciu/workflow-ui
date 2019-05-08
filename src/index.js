import React from 'react';
import ReactDOM from 'react-dom';

// Order here matters, import scss before other components
// import './styles/index.scss';
import './styles/less/index.less';

import { Root } from './Root';
import { store, history } from 'ReduxState/index';

ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));

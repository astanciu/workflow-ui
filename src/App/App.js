import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard, Adapters, Workflows, NotFound } from '../Routes';
import { Layout } from './Layout';

import './App.css';

class App extends Component {
  render() {
    const { match } = this.props;
    console.log('Match: ', match);
    return (
      <Layout>
        <Switch>
          <Route exact path={`${match.path}`} component={Dashboard} />
          <Route exact path={`${match.path}adapters`} component={Adapters} />
          <Route exact path={`${match.path}workflows`} component={Workflows} />

          <Route render={props => <NotFound {...props} source="App" />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;

import GraphiQL from 'custom-graphiql';
import 'custom-graphiql/custom-graphiql.css';
import React, { Component } from 'react';
import './GQLExplorer.css';
import Transport from './Transport';

const transport = new Transport('/api/graphql');

export class GQLExplorer extends Component {
  componentWillMount() {
    localStorage.setItem('cgraphiql:currentURL', `${window.location.protocol}//${window.location.host}/api/graphql`);
  }

  render() {
    return (
      <div className="gqlexplorer">
        <GraphiQL transport={{ httpClient: transport.apiClient }} />
      </div>
    );
  }
}

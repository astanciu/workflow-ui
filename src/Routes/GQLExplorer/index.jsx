import GraphiQL from 'custom-graphiql';
import 'custom-graphiql/custom-graphiql.css';
import React, { Component } from 'react';
import './GQLExplorer.css';
import Transport from './Transport';

const transport = new Transport('/api/graphql');
// const defaultQueries = `{"Requests":"${window.location.protocol}//${window.location.host}/graphql?query=%7B%0A%20%20requests%20%7B%0A%20%20%20%20uuid%0A%20%20%20%20number%0A%20%20%20%20status%0A%20%20%20%20beneficiary%20%7B%0A%20%20%20%20%20%20user_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%20%20requester%20%7B%0A%20%20%20%20%20%20user_id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%20%20resources%20%7B%0A%20%20%20%20%20%20resource%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20description%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&variables=%7B%7D&response=%7B%7D"}`;

export class GQLExplorer extends Component {
  componentWillMount() {
    localStorage.setItem('cgraphiql:currentURL', `${window.location.protocol}//${window.location.host}/api/graphql`);
    // const savedQueriesKey = `cgraphiql:${window.location.protocol}//${window.location.host}/graphql:queries`;
    // const savedQueries = localStorage.getItem(savedQueriesKey);
    // if (!savedQueries) localStorage.setItem(savedQueriesKey, defaultQueries);
  }

  render() {
    const t = {
      httpClient: transport.apiClient,
    };
    return (
      <div className="gqlexplorer">
        <GraphiQL transport={t} />
      </div>
    );
  }
}

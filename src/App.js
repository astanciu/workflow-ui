import React, { Component } from 'react';
import './App.css';
import WorkflowEditor from './WorkflowEditor/WorkflowEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WorkflowEditor />
      </div>
    );
  }
}

export default App;

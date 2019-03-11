import React, { Component } from 'react';
import { Spinner } from '../components/index';
import { Workflow } from '../Workflow/Workflow';
import workflow1 from './samples/workflow1';

type Props = {};
class WorkflowEditor extends Component<Props> {
  state = {
    loading: true,
    workflow: undefined
  };

  componentDidMount() {
    this.loadWorkflow();
  }

  loadWorkflow = () => {
    this.setState({
      loading: false,
      workflow: workflow1
    });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <Workflow workflow={this.state.workflow} />;
  }
}

export default WorkflowEditor;

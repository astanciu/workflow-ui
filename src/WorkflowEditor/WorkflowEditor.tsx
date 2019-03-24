import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../components/index';
import { Workflow } from '../Workflow/Workflow';
import { loadWorkflow } from '../redux/actions';

type Props = {
  loadWorkflow: () => void;
  loading: boolean;
  error: Error;
};

@connect(
  state => ({
    loading: state.loading,
    error: state.error
  }),
  { loadWorkflow }
)
export default class WorkflowEditor extends Component<Props> {
  componentWillMount() {
    this.props.loadWorkflow();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <div>{this.props.error.message}</div>;
    }

    console.log('Render WorkflowEditor', this.props);

    return <Workflow />;
  }
}

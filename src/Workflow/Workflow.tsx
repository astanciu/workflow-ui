import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../components/index';
import Canvas from '../Canvas/Canas';
import { loadWorkflow } from '../redux/actions';
import { TopBar } from '../TopBar/TopBar';
import { Sidebar } from '../Sidebar/Sidebar';
import { AddModal } from '../AddModal/AddModal';
import { Panel } from '../Panel/Panel';
import { Test } from '../Test/Test';
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
export default class Workflow extends Component<Props> {
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

    return (
      <>
        <TopBar />
        {/* <Sidebar /> */}
        {/* <Panel /> */}
        <Canvas />
        {/* <AddModal /> */}
        <Test />
      </>
    );
  }
}

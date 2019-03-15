import React, { Component } from 'react';
import findIndex from 'lodash/findIndex';

import Canvas from '../Canvas/Canvas';
import { Node } from '../classes';

type WorkflowType = {
  workflow: any;
};

type WorkflowState = {
  nodes: Node[];
};

export class Workflow extends Component<WorkflowType> {
  state: WorkflowState = {
    nodes: []
  };

  componentDidMount() {
    this.setState({
      nodes: this.props.workflow.nodes.map(node => new Node(node)) as Node[]
    });
  }

  onNodeSelect = (node: Node) => {
    node.selected = true;
    this.updateNode(node);
  };

  onNodeDeSelect = (node: Node) => {
    delete node.selected;
    this.updateNode(node);
  };

  updateNode = (node: Node) => {
    this.setState((previousState: WorkflowState) => {
      const nodes = previousState.nodes.map(n => (n.id === node.id ? node : n));

      return { nodes };
    });
  };

  selectNode = (node: Node | null) => {
    if (node === null || !node) {
      const node = this.state.nodes.find(n => n.selected);
      if (!node) return;
      this.onNodeDeSelect(node);
      return;
    }

    const currentlySelected = this.state.nodes.find(n => n.selected);
    if (currentlySelected) {
      this.onNodeDeSelect(currentlySelected);
      if (currentlySelected.id === node.id) return;
    }

    this.onNodeSelect(node);
  };

  isAnyNodeSelected = (): boolean => {
    return !!this.state.nodes.find(n => n.selected);
  };

  render() {
    return (
      <Canvas
        nodes={this.state.nodes}
        updateNode={this.updateNode}
        selectNode={this.selectNode}
        isAnyNodeSelected={this.isAnyNodeSelected()}
      />
    );
  }
}

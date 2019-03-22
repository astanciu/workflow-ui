import React from 'react';
import ReactDOM from 'react-dom';
import EventManager from '../Util/EventManager.js';
import { Node } from '../../classes';
import styles from './Port.module.css';

type InPortProps = {
  node: Node;
  unselected: boolean;
  highlight: boolean;
};

export class InPort extends React.Component<InPortProps> {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    const em = new EventManager(domNode, this.props.node);
    em.onMove(this._onMove);
  }

  _onMove = e => {
    e.stopPropagation();
  };

  render() {
    let className = styles.Port;
    if (this.props.unselected) {
      className = styles.PortUnselected;
    }
    if (this.props.highlight) {
      className = styles.PortHighlight;
    }

    return (
      <circle
        className={className}
        cx={this.props.node.inPortOffset.x}
        cy={this.props.node.inPortOffset.y}
        r={this.props.highlight ? '6' : '4'}
      />
    );
  }
}

type OutPortProps = {
  node: Node;
  unselected: boolean;
  onConnectionDrag: (node: Node, e: Event) => void;
  onConnectionEnd: (node: Node, e: Event) => void;
};

export class OutPort extends React.Component<OutPortProps> {
  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this);
    const em = new EventManager(domNode, this.props.node);
    em.onMove(this._onMove);

    em.onMoveEnd(this._onMoveEnd);
  }

  _onMove = e => {
    e.stopPropagation();
    this.props.onConnectionDrag(this.props.node, e);
  };

  _onMoveEnd = e => {
    e.stopPropagation();
    // console.log(`onMoveEnd ${this.props.node.name}`, e.data);
    this.props.onConnectionEnd(this.props.node, e);
  };
  render() {
    let className = styles.Port;

    if (this.props.unselected) {
      className = styles.PortUnselected;
    }

    return (
      <g>
        <circle
          className={styles.PortHitBox}
          cx={this.props.node.outPortOffset.x}
          cy={this.props.node.outPortOffset.y}
          r="20"
        />
        <circle
          className={className}
          cx={this.props.node.outPortOffset.x}
          cy={this.props.node.outPortOffset.y}
          r="4"
        />
      </g>
    );
  }
}

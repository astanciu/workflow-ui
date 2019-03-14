import React from 'react';
import ReactDOM from 'react-dom';
import EventManager from '../Util/EventManager.js';
import { Node } from '../../classes';

type Props = {
  node: Node;
  onConnectionDrag: (node: Node, e: Event) => void;
  onConnectionEnd: (node: Node, e: Event) => void;
  className: string;
};

class Port extends React.Component<Props> {
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
    // e.stopPropagation();
    console.log(`onMoveEnd ${this.props.node.name}`, e.data);
    this.props.onConnectionEnd(this.props.node, e);
  };
}

export class InPort extends Port {
  render() {
    return (
      <circle
        className={this.props.className}
        cx={this.props.node.inPortOffset.x}
        cy={this.props.node.inPortOffset.y}
        r="6"
      />
    );
  }
}

export class OutPort extends Port {
  render() {
    return (
      <circle
        className={this.props.className}
        cx={this.props.node.outPortOffset.x}
        cy={this.props.node.outPortOffset.y}
        r="6"
      />
    );
  }
}

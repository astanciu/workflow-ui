import React from 'react';
import { Point, Node } from '../../classes';
import styles from './Connections.module.css';

type Props = {
  startNode: Node;
  mouse: Point;
};

const ConnectionPreview = ({ startNode, mouse }: Props) => {
  const { x: startX, y: startY } = startNode.outPortPosition;
  const { x: endX, y: endY } = mouse;

  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      className={styles.previewConnection}
    />
  );
};

export default ConnectionPreview;

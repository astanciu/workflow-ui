import React from 'react';
import { Point, Node } from '../../classes';
import styles from './Connections.module.css';
import { makeSVGPath } from './util';

type Props = {
  startNode: Node;
  mouse: Point;
};

const ConnectionPreview = ({ startNode, mouse }: Props) => {
  const { x: startX, y: startY } = startNode.outPortPosition;
  const { x: endX, y: endY } = mouse;

  const { path } = makeSVGPath(startX, startY, endX, endY);

  return <path d={path} className={styles.previewConnection} />;
};

export default ConnectionPreview;

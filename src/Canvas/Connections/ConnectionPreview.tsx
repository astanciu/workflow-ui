import React from 'react';
import { Point, Node } from '../../classes';
import styles from './Connections.module.css';
import { makeSVGPath } from './util';

type Props = {
  startNode: Node;
  mouse: Point;
};

const ConnectionPreview = ({ startNode, mouse }: Props) => {
  const { path } = makeSVGPath(startNode.outPortPosition, mouse);

  return <path d={path} className={styles.previewConnection} />;
};

export default ConnectionPreview;

import React from 'react';
import { Node, Connection } from '../../classes';
import styles from './Connections.module.css';
import createSVGPath from './util';
type Props = {
  connection: Connection;
};

const ConnectionComponent = ({ connection }: Props) => {
  const { x: startX, y: startY } = connection.from.outPortPosition;
  const { x: endX, y: endY } = connection.to.inPortPosition;

  // console.log(startX, startY, endX, endY);
  // console.log('from: ', connection.from.position);

  const d = createSVGPath(startX, startY, endX, endY);

  return <path d={d} className={styles.Connection} />;
};

export default ConnectionComponent;

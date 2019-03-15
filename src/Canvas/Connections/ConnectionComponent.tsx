import React from 'react';
import { Node, Connection } from '../../classes';
import styles from './Connections.module.css';

type Props = {
  connection: Connection;
};

const ConnectionComponent = ({ connection }: Props) => {
  const { x: startX, y: startY } = connection.from.outPortPosition;
  const { x: endX, y: endY } = connection.to.inPortPosition;

  console.log(startX, startY, endX, endY);
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

export default ConnectionComponent;

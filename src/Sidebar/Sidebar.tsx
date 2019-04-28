import React from 'react';
import styles from './Sidebar.module.css';
import { Icon } from 'Components';

export const Sidebar = props => {
  return (
    <div className={styles.sidebar}>
      <Item icon="plus-circle">Add</Item>
      <Item icon="save">Save</Item>
    </div>
  );
};

const Item = ({ icon, children }) => {
  return (
    <div className={styles.Item}>
      <Icon icon={icon} size={30} color="#4ca4f1" />
    </div>
  );
};

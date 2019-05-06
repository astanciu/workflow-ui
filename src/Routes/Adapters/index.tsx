import React, { useState, useRef } from 'react';
import { useSelectedItem } from 'Core/useSelectedItem';
import styled from 'styled-components';
import { Page } from 'Components/Page';
import { Button, Tabs, Input } from 'antd';
import { AdapterItem } from './AdapterItem';
import { Portal } from 'Components/Portal';

import { useGetData } from 'Core/Data';
import { Spinner } from 'Components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: '. . . .' '. . . .';
  grid-gap: 20px;
`;

export const Adapters = (props) => {
  const domEl = useRef<HTMLDivElement>(null);
  const [selectedAdapter, select] = useSelectedItem(domEl);
  const [loading, adapters, error] = useGetData();
  const [tab, setTab] = useState('all');

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <Spinner />;
  }

  const list = (adapters as any[])!.map((a) => (
    <AdapterItem key={a.id} adapter={a} selected={a.id === selectedAdapter} select={select} />
  ));

  const searchBar = (
    <div>
      <Input.Search size="small" />
    </div>
  );
  return (
    <Page empty={true}>
      <Page.Header>
        <Page.Title>Adapters</Page.Title>
        <Button type="primary" icon="plus" size="default">
          Adapter
        </Button>
      </Page.Header>
      <Tabs
        activeKey={tab}
        defaultActiveKey="all"
        onChange={(key) => setTab(key)}
        size="small"
        animated={false}
        tabBarGutter={5}
        tabBarExtraContent={searchBar}
        tabBarStyle={{ borderBottom: '1px solid #c4cfd9', textTransform: 'uppercase' }}
      >
        <Tabs.TabPane tab="All" key="all">
          <Grid ref={domEl}>{list}</Grid>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Mine" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Team" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>

      {!selectedAdapter && (
        <Portal>
          <h1>Adapters</h1>
          <p>What they are</p>
        </Portal>
      )}
    </Page>
  );
};

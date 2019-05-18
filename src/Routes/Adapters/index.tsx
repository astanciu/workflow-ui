import { Button, Input, Tabs } from 'antd';
import { Spinner } from 'Components';
import { PageError } from 'Components/Errors';
import { Page } from 'Components/Page';
import { Portal } from 'Components/Portal';
import { useSelectedItem } from 'Core/useSelectedItem';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDefaultAdapter, loadAdapters } from 'ReduxState/actions';
import styled from 'styled-components';
import { AdapterItem } from './AdapterItem';
import { AdapterPanel } from './AdapterPanel';

const Grid = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: '. . . .' '. . . .';
  grid-gap: 20px;
`;

export const Adapters = (props) => {
  const domEl = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.adapters.loading);
  const adapters = useSelector((state) => state.adapters.adapters);
  const error = useSelector((state) => state.adapters.error);
  const loadingCreate = useSelector((state) => state.adapters.loadingCreate);

  const [tab, setTab] = useState('all');
  const [selectedUuid, setSelected] = useSelectedItem(domEl, '', 'adapters.selected');

  const load = async () => {
    // Hack for stupid tabs
    setImmediate(() => {
      dispatch(loadAdapters());
    });
  };

  const createAdapter = async () => {
    dispatch(createDefaultAdapter());
  };

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <Spinner />;

  const list = adapters.map((a) => (
    <AdapterItem key={a.uuid} adapter={a} selected={a.uuid === selectedUuid} select={setSelected} />
  ));

  const selectedAdapter = adapters.find((a) => a.uuid === selectedUuid);

  const searchBar = (
    <div>
      <Input.Search size="small" />
    </div>
  );

  if (error) {
    return (
      <PageError error={error}>
        <Button onClick={load}>Retry</Button>
      </PageError>
    );
  }

  return (
    <Page empty={true} r={domEl}>
      <Page.Header>
        <Page.Title>Adapters</Page.Title>
        <Button
          type="primary"
          icon="plus"
          size="default"
          onClick={createAdapter}
          loading={loadingCreate && { delay: 300 }}
        >
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
        <Tabs.TabPane tab="My Adapters" key="all">
          <Grid>{list}</Grid>
        </Tabs.TabPane>
        <Tabs.TabPane tab="System" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
        <Tabs.TabPane tab="Community" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
      <Portal>
        {selectedAdapter ? (
          <AdapterPanel adapter={selectedAdapter} />
        ) : (
          <>
            <h1>Adapters</h1>
            <p>What they are</p>
          </>
        )}
      </Portal>
    </Page>
  );
};

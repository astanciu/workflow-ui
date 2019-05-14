import { Empty, Tabs } from 'antd';
import { FlexRow, Spinner } from 'Components';
import { Err } from 'Components/Err';
import { Monaco } from 'Components/Monaco';
import { Page } from 'Components/Page';
import { Portal } from 'Components/Portal';
import { useGetData } from 'Core/Data';
import { Adapter } from 'Core/Types';
import { useConfirm } from 'Core/useConfirm';
import get from 'lodash-es/get';
import React, { useState } from 'react';
import { EditorPanel } from './EditorPanel';
import { Files } from './Files';
import { getLanguage } from './helpers';
import { Container } from './styles';
import { OpenFile } from './types';

export const CodeEditor = ({ match }) => {
  const id = get(match, 'params.id');
  const [loading, dbadapter, error] = useGetData<Adapter>('adapter');
  const [adapter, setAdapter] = useState<Adapter | undefined>(dbadapter);
  const [openTabs, setOpenTabs] = useState<OpenFile[]>([]);
  const [activeTab, setActiveTab] = useState<string>();
  const [dirtyFiles, setDirtyFiles] = useState<string[]>([]);
  const [tempCode, setTempCode] = useState<string>('');
  const showConfirm = useConfirm();

  if (loading) return <Spinner />;
  if (error) return <Err error={error} />;

  if (dbadapter && !adapter) {
    setAdapter(dbadapter);
  }
  if (!adapter) return <Err error={{ message: 'Adapter not found' }} />;

  const onFileSelect = (fileName, code) => {
    if (openTabs.find((tab) => tab.fileName === fileName)) {
      setActiveTab(fileName);
    } else {
      setActiveTab(fileName);
      setOpenTabs((files) => files.concat({ fileName, code }));
    }
  };

  const onEdit = async (fileName, action) => {
    if (action === 'remove') {
      if (dirtyFiles.includes(fileName)) {
        const save = await showConfirm({
          title: 'Save?',
          message: 'You have unsaved changes, would you like to save before closing?',
          yesLabel: 'Save',
          noLabel: "Don't Save",
        });

        if (save) {
          onSave(tempCode);
        }
      }
      const remainingTabs = openTabs.filter((tab) => tab.fileName !== fileName);
      setActiveTab((remainingTabs[0] || {}).fileName);
      setOpenTabs(remainingTabs);
    }
  };

  const onSave = (code) => {
    const fileName = activeTab!;
    setDirtyFiles((files) => files.filter((file) => file !== fileName));
    setAdapter((adapter) => {
      adapter!.files[fileName] = code;

      return adapter;
    });
    setOpenTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.fileName === fileName) {
          tab.code = code;
          return tab;
        }
        return tab;
      })
    );
  };

  const onDirty = (file) => {
    if (!dirtyFiles.includes(file)) {
      setDirtyFiles((files) => files.concat(file));
    }
  };

  return (
    <Page empty={true}>
      <Page.Header>
        <Page.Title>Google Adapter</Page.Title>
      </Page.Header>
      <FlexRow style={{ alignItems: 'stretch', height: '100%' }}>
        <Files fs={adapter.files} onFileSelect={onFileSelect} />
        <Container>
          {openTabs.length ? (
            <Tabs
              hideAdd
              onChange={(tab) => setActiveTab(tab)}
              activeKey={activeTab}
              type="editable-card"
              onEdit={onEdit}
              prefixCls="code-tabs"
              animated={false}
            >
              {openTabs.map((file) => (
                <Tabs.TabPane tab={file.fileName} key={file.fileName}>
                  <Container style={{ border: '1px solid #b6bdc0', borderTop: 'none' }}>
                    <Monaco
                      id={`editor-${file.fileName}`}
                      fileName={file.fileName}
                      code={file.code}
                      toolbar={true}
                      focus={true}
                      onChange={(code) => setTempCode(code)}
                      onSave={onSave}
                      language={getLanguage(file.fileName)}
                      onDirty={onDirty}
                    />
                  </Container>
                </Tabs.TabPane>
              ))}
            </Tabs>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Container>
      </FlexRow>

      <Portal>
        <EditorPanel adapter={adapter} />
      </Portal>
    </Page>
  );
};

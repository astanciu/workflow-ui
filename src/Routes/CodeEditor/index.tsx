import React from 'react';
import { Page } from 'Components/Page';
import { Portal } from 'Components/Portal';
import styled from 'styled-components';
import { FlexCol, FlexRow } from 'Components/Layout';
import { Tabs, Button } from 'antd';

// import styled from 'styled-components';
// import { useGetData } from 'Core/Data';
import { Files } from './Files';
import { FileEditor } from './FileEditor';
import { EditorPanel } from './EditorPanel';

import { adapter } from 'samples/adapter';

const Container = styled.div`
  // border: 1px solid red;
  // background-color: white;
  width: 100%;
  height: 100%;
  ${({ style }) => style}
`;

export class CodeEditor extends React.Component {
  private newTabIndex: number = 0;
  public state: any = {
    activeKey: undefined,
    openFiles: [],
    adapter,
  };

  constructor(props) {
    super(props);
    // this.newTabIndex = 0;
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  fileSelected = (file, code) => {
    const openFiles = this.state.openFiles;
    const activeKey = file;
    if (openFiles.find((f) => f.key === file)) {
      this.setState({ activeKey });
    } else {
      openFiles.push({ title: file, code, key: activeKey });
      this.setState({ openFiles, activeKey });
    }
  };

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.openFiles.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const openFiles = this.state.openFiles.filter((pane) => pane.key !== targetKey);
    if (openFiles.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = openFiles[lastIndex].key;
      } else {
        activeKey = openFiles[0].key;
      }
    }
    this.setState({ openFiles, activeKey });
  };

  render() {
    return (
      <Page empty={true}>
        <Page.Header>
          <Page.Title>Google Adapter</Page.Title>
        </Page.Header>
        <FlexRow style={{ alignItems: 'stretch', height: '100%' }}>
          <Files fs={this.state.adapter.files} onFileSelect={this.fileSelected} />
          <Container>
            <Tabs
              hideAdd
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              prefixCls="code-tabs"
            >
              {this.state.openFiles.map((pane) => (
                <Tabs.TabPane tab={pane.title} key={pane.key}>
                  <Container style={{ border: '0px solid gray' }}>
                    {/* {pane.code} */}
                    {this.state.activeKey === pane.key ? (
                      // <div>test</div>
                      <FileEditor code={pane.code} />
                    ) : (
                      <div>no render</div>
                    )}
                  </Container>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </Container>
        </FlexRow>

        <Portal>
          <EditorPanel adapter={adapter} />
        </Portal>
      </Page>
    );
  }
}

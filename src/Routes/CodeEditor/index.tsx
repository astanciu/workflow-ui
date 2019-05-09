import React from 'react';
import produce from 'immer';
import { Page } from 'Components/Page';
import { Portal } from 'Components/Portal';
import styled from 'styled-components';
import { FlexRow } from 'Components/Layout';
import { Tabs, Empty } from 'antd';
import * as T from 'Core/Types';
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

type Props = {
  adapter: T.Adapter;
};

type OpenFile = {
  fileName: string;
  code: string;
};

type State = {
  activeFile?: string;
  openFiles: OpenFile[];
  adapter: T.Adapter;
};

export class CodeEditor extends React.Component<Props, State> {
  public state: State = {
    activeFile: undefined,
    openFiles: [],
    adapter,
  };

  onChange = (activeFile) => {
    this.setState({ activeFile });
  };

  onEdit = (fileName, action) => {
    this[action](fileName);
  };

  fileSelected = (fileName, code) => {
    const nextState = produce(this.state, (state) => {
      const openFiles = this.state.openFiles;
      if (openFiles.find((f) => f.fileName === fileName)) {
        // this.setState({ activeFile: fileName });
        state.activeFile = fileName;
      } else {
        state.activeFile = fileName;
        state.openFiles.push({ fileName, code });
        // openFiles.push({ fileName: fileName, code });
      }
      return state;
    });
    this.setState(nextState);
  };

  remove = (fileName) => {
    const nextState = produce(this.state, (state) => {
      let activeFile = state.activeFile;
      let lastIndex;
      state.openFiles.forEach((pane, i) => {
        if (pane.fileName === fileName) {
          lastIndex = i - 1;
        }
      });
      const openFiles = state.openFiles.filter((pane) => pane.fileName !== activeFile);
      if (openFiles.length && activeFile === fileName) {
        if (lastIndex >= 0) {
          activeFile = openFiles[lastIndex].fileName;
        } else {
          activeFile = openFiles[0].fileName;
        }
      }
      state.openFiles = openFiles;
      state.activeFile = activeFile;

      return state;
    });
    // this.setState({ openFiles, activeFile });
    this.setState(nextState);
  };

  onSave = (code) => {
    const file = this.state.activeFile;
    if (!file) {
      throw new Error('Trying to save but no Active File');
    }

    const nextState = produce(this.state, (state) => {
      state.adapter.files[file] = code;
      state.openFiles.map((f) => {
        if (f.fileName === file) {
          f.code = code;
          return f;
        }
        return f;
      });

      return state;
    });

    this.setState(nextState);
  };

  getLanguage = (file) => {
    const ext = file.split('.').pop();
    switch (ext.toLowerCase()) {
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      case 'json':
        return 'json';
      default:
        return 'text';
    }
  };

  setDirty = (file) => {
    console.log(`${file} is dirty`);
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
            {this.state.openFiles.length ? (
              <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeFile}
                type="editable-card"
                onEdit={this.onEdit}
                prefixCls="code-tabs"
                animated={false}
              >
                {this.state.openFiles.map((file) => (
                  <Tabs.TabPane tab={file.fileName} key={file.fileName}>
                    <Container style={{ border: '0px solid gray' }}>
                      <FileEditor
                        fileName={file.fileName}
                        code={file.code}
                        toolbar={true}
                        focus={true}
                        onSave={this.onSave}
                        language={this.getLanguage(file.fileName)}
                        setDirty={this.setDirty}
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
          <EditorPanel adapter={this.state.adapter} />
        </Portal>
      </Page>
    );
  }
}

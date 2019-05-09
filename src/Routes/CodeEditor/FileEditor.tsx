import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Button } from 'antd';
import { debounce } from 'lodash';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
const Container = styled.div`
  position: relative;
  height: 100%;
`;

type Props = {
  fileName: string;
  code: string;
  width?: string;
  height?: string;
  language?: string;
  hideGutter?: boolean;
  readOnly?: boolean;
  toolbar?: boolean;
  focus?: boolean;
  onSave?: (code: string) => void;
  onChange?: (code: string) => void;
  setDirty?: (fileName: string, dirty: boolean) => void;
};

const Toolbar = styled.div`
  position: absolute;
  bottom: 12px;
  right: 18px;
  z-index: 100;
`;

export class FileEditor extends React.Component<Props> {
  private editor: any;
  private containerRef;
  private model: any;

  static defaultProps = {
    fileName: 'no-name',
    code: '// your code here',
    width: '',
    height: '',
    language: 'javascript',
    hideGutter: false,
    formatOnLoad: false,
    readOnly: false,
    toolbar: true,
    focus: false,
  };

  state = {
    dirty: false,
    newCode: undefined,
  };

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentWillUnmount() {
    this.model.dispose();
  }

  editorDidMount = (editor, monaco) => {
    this.editor = editor;
    setTimeout(() => {
      // editor && editor.getAction('editor.action.formatDocument').run();
      if (this.props.focus) {
        editor.focus();
      }
    }, 300);

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true,
    });

    monaco.editor.defineTheme('workflows', {
      base: 'vs',
      inherit: true,
      rules: [{ background: '#dbe2e6' }],
      colors: {
        'editor.background': '#dbe2e6',
        'editor.lineHighlightBackground': '#dbe1e6',
      },
    });
    monaco.editor.setTheme('workflows');

    this.model = monaco.editor.createModel(this.props.code, this.props.language);
    editor.setModel(this.model);
  };

  _onChange = (value, e) => {
    this.setState({ newCode: value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    if (value !== this.props.code) {
      if (this.props.setDirty && !this.state.dirty) {
        this.setDirty(true);
      }
    }
  };

  onChange = debounce(this._onChange, 500, { leading: true, trailing: true });

  setDirty = (dirty: boolean) => {
    this.setState({ dirty });
    this.props.setDirty && this.props.setDirty(this.props.fileName, dirty);
  };

  componentWillReceiveProps(props) {
    console.log(`will rec props`, props);
    if (props.code !== this.props.code) {
      const self = this;
      setTimeout(function() {
        self.editor.getAction('editor.action.formatDocument').run();
      }, 300);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.code !== this.props.code ||
      nextState.dirty !== this.state.dirty ||
      nextState.newCode !== this.state.newCode
    ) {
      console.log(`updated`, nextProps, nextState);
      return true;
    }
    console.log(`not updated`, nextProps, nextState);
    return false;
  }

  onResize = (w, h) => {
    if (this.editor) {
      let container = this.containerRef.current;
      if (container) {
        const parent = container.parentNode;
        let width = parent.offsetWidth - 2;
        let height = parent.offsetHeight - 2;
        // console.log(`layout: ${width} x ${height}`);
        this.editor.layout({ width, height });
      }
    }
  };

  save = () => {
    const model = this.editor.getModel();
    const code = model.getValue();
    if (this.props.onSave) {
      this.props.onSave(code);
      this.setDirty(false);
    }
  };

  render() {
    const options = {
      lineNumbers: this.props.hideGutter ? 'off' : 'on',
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: this.props.readOnly,
      cursorStyle: 'line',
      automaticLayout: false,
      minimap: { enabled: false },
      scrollbar: { vertical: 'auto', verticalScrollbarSize: 8, horizontal: 'auto', horizontalScrollbarSize: 8 },
    };
    const props: any = {};
    if (this.props.width) props.width = this.props.width;
    if (this.props.height) props.height = this.props.height;

    const showToolbar = this.props.toolbar;
    const code = this.state.newCode === undefined ? this.props.code : this.state.newCode;

    return (
      <Container ref={this.containerRef}>
        {!this.props.height && (
          <ReactResizeDetector
            handleWidth
            handleHeight
            refreshMode="debounce"
            refreshOptions={{ leading: true, trailing: true }}
            refreshRate={100}
            onResize={this.onResize}
          />
        )}
        {showToolbar && (
          <Toolbar>
            <Button
              type="primary"
              shape="circle"
              icon="save"
              size="default"
              onClick={this.save}
              disabled={!this.state.dirty}
            />
          </Toolbar>
        )}
        <MonacoEditor
          {...props}
          language={this.props.language || 'javascript'}
          theme="workflows"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </Container>
    );
  }
}

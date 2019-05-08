import React from 'react';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';

import MonacoEditor from 'react-monaco-editor';
import { FlexCol, FlexRow } from 'Components/Layout';
const Container = styled.div`
  // border: 1px solid blue;
`;

type Props = {
  code: string;
};
const defaultCode = `module.exports = () => {
  // Your code here     
  
}`;

export class FileEditor extends React.Component<Props> {
  private editor: any;
  private containerRef;
  state = {
    code: defaultCode,
  };

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }
  editorDidMount = (editor, monaco) => {
    this.editor = editor;

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
    editor.focus();
  };

  // componentWillReceiveProps(props){
  //   this.setState({code: props.code})
  // }

  onChange = (newValue, e) => {
    // console.log('onChange', newValue, e);
  };

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
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
      minimap: { enabled: false },
    };
    return (
      <Container ref={this.containerRef}>
        <ReactResizeDetector
          handleWidth
          handleHeight
          refreshMode="debounce"
          refreshOptions={{ leading: true, trailing: true }}
          refreshRate={100}
          onResize={this.onResize}
        />
        <MonacoEditor
          language="javascript"
          theme="workflows"
          value={this.props.code || defaultCode}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </Container>
    );
  }
}

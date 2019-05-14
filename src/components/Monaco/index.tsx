import { Button } from 'antd';
import debounce from 'lodash-es/debounce';
import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';
import { configureMonaco, configureMonacoEnv } from './helpers';
import { Container, Toolbar } from './styles';
import { Props } from './types';

configureMonacoEnv();

const MonacoX = ({
  id = '',
  fileName = 'no-name',
  code = 'your code here',
  width = '',
  height = '',
  language = 'javascript',
  hideGutter = false,
  readOnly = false,
  toolbar = true,
  focus = false,
  onChange = undefined,
  onDirty = undefined,
  onSave = undefined,
}: Props) => {
  const containerRef = useRef<HTMLElement>(null);
  const [localCode, setCode] = useState(code);
  const [dirty, setDirty] = useState(false);
  const [editor, setEditor] = useState();
  const [model, setModel] = useState();

  useEffect(() => {
    if (onChange && localCode !== code) {
      onChange(localCode);
    }
  }, [localCode]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (localCode !== code) {
      setCode(code);
    }
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      model && model.dispose();
    };
  }, [editor, model]);

  const onEditorDidMount = (_editor, monaco) => {
    configureMonaco(monaco);
    const model = monaco.editor.createModel(localCode, language);
    _editor.setModel(model);

    setEditor(_editor);
    setModel(model);
  };

  const onResize = (w, h) => {
    if (editor) {
      let containerEl = containerRef.current;
      if (containerEl) {
        const parent = containerEl.parentElement;
        let width = parent!.offsetWidth - 2;
        let height = parent!.offsetHeight - 2;
        editor.layout({ width, height });
      }
    }
  };

  const onSaveClick = () => {
    const code = model.getValue();
    if (onSave) {
      onSave(code);
      setDirty(false);
    }
  };

  const onCodeChange = debounce(
    (value, e) => {
      setCode(value);
      if (value !== localCode) {
        if (onDirty && !dirty) {
          setDirty(true);
          onDirty(fileName, true);
        }
      }
    },
    500,
    { leading: true, trailing: true }
  );

  const monacoOptions = {
    lineNumbers: hideGutter ? 'off' : 'on',
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: readOnly,
    cursorStyle: 'line',
    automaticLayout: false,
    minimap: { enabled: false },
    scrollbar: { vertical: 'auto', verticalScrollbarSize: 8, horizontal: 'auto', horizontalScrollbarSize: 8 },
  };

  const extraProps: any = {};
  if (width) extraProps.width = width;
  if (height) extraProps.height = height;

  return (
    <Container ref={containerRef}>
      {!height && (
        <ReactResizeDetector
          handleWidth
          handleHeight
          refreshMode="debounce"
          refreshOptions={{ leading: true, trailing: true }}
          refreshRate={200}
          onResize={onResize}
        />
      )}
      {toolbar && (
        <Toolbar>
          <Button type="primary" shape="circle" icon="save" size="default" onClick={onSaveClick} disabled={!dirty} />
        </Toolbar>
      )}
      <MonacoEditor
        {...extraProps}
        language={language}
        theme="workflows"
        value={localCode}
        options={monacoOptions}
        onChange={onCodeChange}
        editorDidMount={onEditorDidMount}
      />
    </Container>
  );
};
export const Monaco = React.memo(MonacoX);

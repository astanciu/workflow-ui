import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
// import { useDispatch } from 'react-redux';
// import { push } from 'connected-react-router';
import { Run } from './Runner';
import { FlexRow, Center } from 'Components/Layout';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import { Title } from 'Components/EditableTitle';
import { RunPane } from './RunPane';
import { FileEditor } from './FileEditor';

const Container = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Scrollable = styled.div`
  // border: 1px solid red;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  ${({ style }) => style}
`;

const defResult = `
  // Results 
`;

const defInput = JSON.stringify({ name: 'Smith' });

export const EditorPanel = ({ adapter }) => {
  const [result, setResult] = useState(defResult);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(defInput);

  const runCode = async () => {
    setLoading(true);
    console.log(`running. input: `, input);
    try {
      // let mod = await Run(adapter.files);
      const foo = async (a) => a;
      console.log(`1`, foo);
      // if (typeof foo !== 'function') {
      //   throw new Error('Must export a function');
      // }
      // if (foo.length !== 1) {
      //   throw new Error('Only one param allowed');
      // }
      let result = await foo(JSON.parse(input));
      console.log(2, result);
      let str = JSON.stringify(result);
      console.log(2.2, str);
      setResult(str);
      console.log(`3`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setResult(JSON.stringify(err));
      // setLoading(false);
    }
  };

  const test = async () => {
    return Date.now().toString();
  };
  const run2 = async () => {
    const foo = async (a) => a;
    // let result = await foo(JSON.parse(input));
    // let result = await foo(Date.now().toString());
    // const fuck = Date.now().toString();
    const fuck = Math.random() + '-' + input;
    console.log(`fuck: `, fuck);
    let result = await foo(fuck);
    console.log(`result: `, result);
    setResult(result);
  };

  return (
    <Container id="editor-panel">
      <FlexRow style={{ padding: '20px 0px 0px 20px' }}>
        <HTMLNodeIcon icon={adapter.icon} size={20} />
        <Title>{adapter.name}</Title>
      </FlexRow>

      <Scrollable style={{ paddingTop: '20px' }}>
        <RunPane title="Run">
          <RunPane.Section style={{ marginTop: '-28px' }} first>
            <FileEditor
              language="json"
              code={input}
              onChange={(code) => setInput(code)}
              width="100%"
              height="200px"
              hideGutter={true}
              toolbar={false}
              focus={false}
            />
          </RunPane.Section>
          <RunPane.Section icon="down-circle">
            <RunPane.Text>
              <Center>
                <div>Enter the input above and execute the Adapter. Output will be show below.</div>

                <Button type="primary" icon="play-circle" style={{ margin: '20px' }} onClick={run2} loading={loading}>
                  Run
                </Button>
              </Center>
            </RunPane.Text>
          </RunPane.Section>
          <RunPane.Section icon="down-circle">
            <FileEditor
              code={result}
              language="json"
              width="100%"
              height="200px"
              hideGutter={true}
              toolbar={false}
              focus={false}
            />
          </RunPane.Section>
        </RunPane>
      </Scrollable>
    </Container>
  );
};

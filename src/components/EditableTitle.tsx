import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const Title = styled.div`
  font-size: 1.2em;
  font-weight: 700;
  margin: 0px 2px 0px 10px;
`;

const Input = styled.input`
  margin: 0px 2px 0px 10px;
  border: none;
  border-bottom: 1px solid #c4cfd9;
`;

export const EditableTitle = ({ title, onChange }) => {
  const ref = useRef<HTMLInputElement>();
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(title);

  const save = () => {
    setEdit(false);
    onChange(val);
  };

  const goEdit = () => {
    setEdit(true);
    setTimeout(() => {
      ref.current && ref.current.focus();
    }, 200);
  };

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      setEdit(false);
      onChange(e.target.value);
    }
  };

  if (edit) {
    console.log(ref.current);
  }

  return (
    <>
      {edit ? (
        <>
          <Input
            ref={ref}
            placeholder="My Adapter"
            value={val}
            onKeyDown={checkEnter}
            onChange={(e) => setVal(e.target.value)}
          />
          <Button size="small" type="ghost" icon="check" onClick={save} />
        </>
      ) : (
        <>
          <Title>{title}</Title>
          <Button type="ghost" icon="edit" size="small" onClick={goEdit} />
        </>
      )}
    </>
  );
};

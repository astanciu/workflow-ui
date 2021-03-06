import React from 'react';
import styled from 'styled-components';
import { Icon } from 'Components';
import { Form } from 'react-bootstrap';

const SearchBarWrapper = styled.div`
  position: relative;
  align-self: center;
  flex-basis: 100%;
`;

const IconWrapper = styled.div`
  // border: 1px solid red;
  position: absolute;
  top: 10px;
  left: 12px;
`;

export const SearchBar = (props) => {
  return (
    <SearchBarWrapper>
      <IconWrapper>
        <Icon icon="search" color="#879199" size={22} />
      </IconWrapper>
      <Form.Control size="lg" type="text" placeholder="" className="searchbar" />
    </SearchBarWrapper>
  );
};

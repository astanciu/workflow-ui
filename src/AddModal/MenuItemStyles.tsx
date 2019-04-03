import styled from 'styled-components';

export const MenuListItem = styled.div`
  // border: 1px solid green;
  display: flex;
  margin: 7px 0px;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  ${({ selected }) => selected && `background-color: hsla(210, 6%, 85%, 1); `}

  &:hover {
    ${({ selected }) => !selected && `background-color: hsla(210, 6%, 90%, 1);`}
  }
`;

export const IconContainer = styled.div`
  // border: 1px solid red;
  margin-right: 5px;
  flex-basis: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 145px;
`;
export const Title = styled.div`
  // padding-top: 3px;
  font-family: Nunito-Bold;
  font-size: 15px;
  color: #64727b;

  ${MenuListItem}:hover & {
    color: #45525c;
    text-decoration: underline;
  }
`;
export const Description = styled.div`
  font-family: Nunito-Regular;
  font-size: 13px;
  color: #879199;
`;

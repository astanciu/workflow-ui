import styled from 'styled-components';

export const NodeListWrapper = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const NodeItemWrapper = styled.div`
  // border: 1px solid red;
  width: 244px;
  height: 75px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  background-color: #d9dbdd;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #c6cdd4;
  }
`;

export const IconContainer = styled.div`
  // border: 1px solid blue;
  padding-right: 10px;
  align-self: flex-start;
  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 145px;
  align-self: flex-start;
`;
export const Title = styled.div`
  // padding-top: 3px;
  font-family: Nunito-Bold;
  font-size: 15px;
  color: #64727b;
`;
export const Description = styled.div`
  font-family: Nunito-Regular;
  font-size: 13px;
  color: #879199;
`;

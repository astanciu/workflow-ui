import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled.div`
  position: absolute;
  width: 800px;
  height: 500px;
  top: 20%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  border-radius: 20px;
  background-color: #ecedee;
  box-shadow: 0px 5px 20px -3px rgba(64, 78, 84, 0.7);

  display: flex;
`;

export const SideMenuContainer = styled.div`
  // border: 1px solid red;
  flex-basis: 230px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  padding-right: 0px;
`;

export const MainContainer = styled.div`
  // border: 1px solid blue;
  flex-basis: 570px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0px 20px;
  padding-right: 40px;
`;

export const SearchContainer = styled.div`
  // border: 1px solid purple;
  flex: 0 0 90px;
  display: flex;
`;
export const NodesContainer = styled.div`
  // border: 1px solid purple;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const FooterContainer = styled.div`
  // border: 1px solid purple;
  flex: 0 0 90px;

  display: flex;
  justify-content: flex-end;
`;

export const Separator = styled.div`
  height: 0px;
  border-bottom: 1px solid #d8d8d8;
`;

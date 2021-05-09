import { FC, ReactNode, MouseEventHandler } from "react";
import styled, { css } from "styled-components/macro";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import Draggable from "react-draggable";

const BorderStyle = css`
  border: 2px solid #fbfbfb;
  border-right-color: black;
  border-bottom-color: black;
  background-color: #cccccc;
`;

const BorderStyleInverse = css`
  border: 2px solid #fbfbfb;
  border-top-color: black;
  border-left-color: black;
  background-color: #cccccc;
`;

const Container = styled.div`
  ${BorderStyle};
  padding: 4px 4px 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopBar = styled.div`
  padding: 4px;
  margin-bottom: 8px;
  background: linear-gradient(to right, #043fb9, #6ca5c5);
  display: flex;
  justify-content: flex-end;
`;

const TopButton = styled.button`
  ${BorderStyle};
  padding: 6px;
  width: 2rem;
  height: 2rem;
`;

const ContentArea = styled.div`
  ${BorderStyleInverse};
  background-color: white;
  flex: auto;
  overflow-y: scroll;
`;

const Handle = styled.div`
    flex: 1;
`;

type Props = {
  children?: ReactNode;
  onCloseClick: MouseEventHandler<HTMLButtonElement>;
};

let DRAGGABLE_HANDLE = "DRAGGABLE_HANDLE";
const ContentWindow: FC<Props> = ({ children, onCloseClick }) => (
  <Draggable handle={`.${DRAGGABLE_HANDLE}`}>
    <ResizableBox height={500} width={500}>
      <Container>
        <TopBar>
          <Handle className={DRAGGABLE_HANDLE} />
          <TopButton aria-label="close" onClick={onCloseClick}>
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              stroke="black"
              strokeWidth="12px"
            >
              <line x1="0" y1="0" x2="100" y2="100" />
              <line x1="100" y1="0" x2="0" y2="100" />
            </svg>
          </TopButton>
        </TopBar>
        <ContentArea>{children}</ContentArea>
      </Container>
    </ResizableBox>
  </Draggable>
);

export default ContentWindow;

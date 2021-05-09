import { DateTime } from "luxon";
import React, {FC, ReactNode} from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  padding: 1rem;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4rem;
`;

const YearContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Year = styled.p`
  font-size: 4rem;
  margin: 1rem 0 0;
`;

const Line = styled.div`
  border-bottom: 0.25rem solid black;
  flex: 1;
  position: relative;
`;

const End = styled.div`
  height: 80px;
  border-left: 0.25rem solid black;
`;

type Props = {
  startDate: string;
  endDate: string;
  children?: ReactNode;
};
const Timeline: FC<Props> = ({ startDate, endDate, children }) => (
  <Container>
    <LineContainer>
      <End />
      <Line>{children}</Line>
      <End />
    </LineContainer>
    <YearContainer>
      <Year>{DateTime.fromISO(startDate).year}</Year>
      <Year>{DateTime.fromISO(endDate).year}</Year>
    </YearContainer>
  </Container>
);

export default Timeline;

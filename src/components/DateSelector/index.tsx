import React, { FC } from "react";
import styled from "styled-components/macro";
import bg from "./bg.jpeg";

const Container = styled.div`
  padding: 2rem;
  height: 400px;
  max-width: 500px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("${bg}") center no-repeat;
  background-size: contain;
  margin-left: auto;
`;

const Content = styled.div``;

const Label = styled.label`
  display: block;
  font-weight: bold;
  padding: 0.25rem;
`;

const Title = styled.p`
  font-size: 2rem;
  margin: 0 0 1rem;
`;
type Props = {
  onStartDateChange: (dateString: string) => void;
  onEndDateChange: (dateString: string) => void;
};
const DateSelector: FC<Props> = ({ onStartDateChange, onEndDateChange }) => (
  <Container>
    <Content>
      <Title>Date</Title>
      <Label htmlFor="start-date">Start</Label>
      <input
        id="start-date"
        type="date"
        onChange={(e) => onStartDateChange(e.currentTarget.value)}
      />
      <Label htmlFor="start-date">End</Label>
      <input
        id="end-date"
        type="date"
        onChange={(e) => onEndDateChange(e.currentTarget.value)}
      />
    </Content>
  </Container>
);

export default DateSelector;

import React, {ComponentProps, FC} from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components/macro";

const Container = styled(NavLink)<{ color?: string }>`
  background-color: ${props => props.color ?? 'white'};
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid black;
  position: absolute;
  border-radius: 50%;
  margin-top: -1rem;
  margin-left: -1rem;
  &.active {
    filter: brightness(50%);
  }
`;

type Props = {
  color?: string;
  to: ComponentProps<typeof NavLink>['to'];
  position: number
};

const WorkNode: FC<Props> = ({ color, to, position }) => <Container to={to} color={color} activeClassName='active'
 style={{ left: `${position}%`}}
/>;

export default WorkNode;

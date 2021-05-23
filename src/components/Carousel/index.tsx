import styled from "styled-components/macro";

export const Item = styled.div`
  scroll-snap-align: start;
  margin: 1rem;
`;

const Carousel = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  display: flex;
`;

export default Carousel;

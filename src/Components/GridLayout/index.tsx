import { PropsWithChildren } from "react";
import { styled } from "styled-components";

const GridLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <GridContainer>{children}</GridContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  width: 1200px;
  padding-inline: 80px;
  box-sizing: border-box;

  background-color: #cbcba4;
  border: 2px solid black;
`;

export default GridLayout;

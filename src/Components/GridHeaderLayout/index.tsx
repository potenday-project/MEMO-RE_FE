import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import Header from "../Header";

const GridHeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <GridContainer>
        <Header />
        {children}
        <BottomField />
      </GridContainer>
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
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 80px 1fr 80px;
  gap: 16px;
  width: 1200px;
  padding-inline: 80px;
  box-sizing: border-box;
`;

const BottomField = styled.div`
  display: grid;
  grid-column: span 12;
`;

export default GridHeaderLayout;

import { styled } from "styled-components";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <GridContainer>
        <DummyField />
        <ContentsLayout>{children}</ContentsLayout>
        <DummyField />
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
  grid-template-rows: 88px 1fr 80px;
  column-gap: 16px;
  width: 1200px;
  padding-inline: 80px;
  box-sizing: border-box;
`;

const ContentsLayout = styled.section`
  grid-column: span 12;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
`;

const DummyField = styled.div`
  grid-column: span 12;
`;
export default MainLayout;

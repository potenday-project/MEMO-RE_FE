import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import GridLayout from "../../components/GridLayout";
import { StyleLineProps } from "../../config/types";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <GridLayout>
      <Container>
        <DummyField>
          <StyleBox />
        </DummyField>
        <Contents>
          <Title>MEMO:RE</Title>
          <SubTitle>Meta Memo System</SubTitle>
          <Description>
            MEMO:RE는 메타인지를 이용한 새로운 메모방식을 제안합니다. 핵심
            키워드와 그 키워드가 중요한 이유를 적어두고 태그별로 관리할 수 있는
            기능을 제공합니다.
          </Description>
          <ButtonField>
            <SignUpButton onClick={() => navigate("/signup")}>
              회원가입
            </SignUpButton>
            <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
          </ButtonField>
        </Contents>

        <StyleLineW direction="row" />
        <StyleLineW direction="column" className="bottom" />
        <StyleLineW direction="column" className="right" />
      </Container>
    </GridLayout>
  );
};

const Container = styled.main`
  position: relative;
  grid-column: span 12;

  display: grid;
  grid-template-rows: 112px 1fr;
  grid-template-columns: 2fr 10fr;
  grid-template-areas:
    "area1 area2"
    "area3 area4";
`;
const DummyField = styled.div`
  grid-area: area2;
`;
const StyleBox = styled.div`
  width: 23px;
  height: 100%;
  background: #d9d9d9;
`;

const Contents = styled.section`
  position: relative;
  grid-area: area4;
`;
const Title = styled.h1`
  font-size: 88px;
  font-weight: 400;
`;

const SubTitle = styled.h3`
  font-size: 36px;
  font-weight: 400;
`;

const Description = styled.p`
  width: 545px;
  font-size: 20px;
  font-weight: 400;
  line-height: 34px;
  display: block;
  margin-top: 30px;
`;

const ButtonField = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  gap: 16px;
`;

const SignUpButton = styled.button`
  width: 248px;
  border-bottom: 1px solid #000;
  color: #000;
  font-size: 30px;
  font-weight: 700;
  padding-bottom: 18px;
  box-sizing: border-box;
`;
const LoginButton = styled(SignUpButton)``;

const StyleLineW = styled.hr<StyleLineProps>`
  position: absolute;
  width: ${({ direction }) => (direction === "row" ? `248px` : `1px`)};
  height: ${({ direction }) => (direction === "row" ? `1px` : `248px`)};
  border: 0;
  background-color: #000;
  &.bottom {
    bottom: 0;
  }
  &.right {
    right: 0;
  }
`;

export default MainPage;

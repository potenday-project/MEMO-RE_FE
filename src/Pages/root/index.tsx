import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import GridLayout from "../../components/GridLayout";
import { StyleLineProps } from "../../config/types";
import useAuthenticated from "../../hooks/useAuthenticated";
import { useEffect } from "react";

const RootPage = () => {
  const navigate = useNavigate();
  const auth = useAuthenticated();

  useEffect(() => {
    if (auth) navigate("/main");
  });

  return (
    <GridLayout>
      <Container>
        <Contents>
          <Title>MEMO:RE</Title>
          <SubTitle>Meta Memo System</SubTitle>
          <Description>
            {`우리는 새로운 메모방식을 제안 합니다. \n블로그는 태그로 관리하면서 왜 메모는 태그로 관리하지 않을까요? \nMEMO:RE는 메모의 핵심 키워드를 태그별로 관리할 수 있는 기능을 제공합니다. \n메모를 기억하기 쉬워지고 그렇게 기억한 메모는 활용하기 쉽습니다. \n일상의 메모를 관리하기 위해 MEMO:RE를 사용해 보세요.`}
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
  justify-content: center;
  align-items: center;
`;

const Contents = styled.section`
  width: 100%;
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
  width: 688px;
  font-size: 16px;
  font-weight: 400;
  line-height: 29px;
  display: block;
  margin-top: 30px;
  white-space: pre-wrap;
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
  top: ${({ direction }) => (direction === "row" ? `0` : `null`)};
  width: ${({ direction }) => (direction === "row" ? `248px` : `1px`)};
  height: ${({ direction }) => (direction === "row" ? `1px` : `248px`)};
  border: 0;
  background-color: #000;
  &.bottom {
    bottom: 0;
  }
  &.right {
    top: 0;
    right: 0;
  }
`;

export default RootPage;

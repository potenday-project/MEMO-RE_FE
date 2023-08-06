import { styled } from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Title>MEMO:RE</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: grid;
  grid-column: span 12;
  align-items: end;
`;

const Title = styled.h1`
  display: block;
  width: 248px;
  border-bottom: 1px solid #000;

  font-size: 36px;
  font-weight: 400;
  line-height: 51px;
`;

export default Header;

import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";
import Header from "../Header";

const HeaderLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

const ContentContainer = styled.main`
  min-height: calc(100vh - 80px);
  padding-inline: 80px;
  box-sizing: border-box;
`;

export default HeaderLayout;

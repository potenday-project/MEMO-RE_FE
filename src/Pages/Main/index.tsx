import { styled } from "styled-components";
import MainLayout from "../../components/MainLayout";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const MainPage = () => {
  const [memoList, setMemoList] = useState([]);

  return (
    <MainLayout>
      <Sidebar />
      {memoList.length ? (
        <Contents>메모가 존재하는 페이지</Contents>
      ) : (
        <Contents>
          <Phrase>Possibility Becomes Everything</Phrase>
        </Contents>
      )}
    </MainLayout>
  );
};

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Phrase = styled.span`
  font-size: 43px;
`;

export default MainPage;

import { styled } from "styled-components";
import MainLayout from "../../components/MainLayout";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const MainPage = () => {
  const [memoList, setMemoList] = useState([
    {
      keyword: "핵심키워드1djsk dkjksfjd dkjfksjd fdkjfkfdj fdkfj d",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tags: ["태그1", "태그2", "태그3"],
      id: "1",
    },
    {
      keyword: "핵심키워드2",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tags: ["태그1", "태그2", "태그3"],
      id: "2",
    },
    {
      keyword: "핵심키워드3",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tags: ["태그1", "태그2", "태그3"],
      id: "3",
    },
    {
      keyword: "핵심키워드4",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tags: ["태그1", "태그2", "태그3"],
      id: "4",
    },
    {
      keyword: "핵심키워드5",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tags: ["태그1", "태그2", "태그3"],
      id: "5",
    },
    {
      keyword: "핵심키워드6",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tags: ["태그1", "태그2", "태그3"],
      id: "6",
    },
  ]);
  const [selected, setSelected] = useState("");

  const handleClickCard = (id: string) => {
    setSelected(id);
    if (id === selected) {
      setSelected("");
    }
  };

  return (
    <MainLayout>
      <Sidebar />
      {memoList.length ? (
        <Contents>
          {memoList.map((memo) => (
            <CardWrap
              onClick={() => handleClickCard(memo.id)}
              key={memo.keyword}
            >
              {selected === memo.id ? (
                <CardBack>
                  <MemoBackContent>{memo.content}</MemoBackContent>
                </CardBack>
              ) : (
                <CardFront>
                  <MemoFrontContent>{memo.keyword}</MemoFrontContent>
                </CardFront>
              )}
            </CardWrap>
          ))}
        </Contents>
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
  flex-wrap: wrap;
  align-items: flex-start;
  background-color: beige;
  height: fit-content;
  gap: 1rem;
`;

const CardWrap = styled.div`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

const CardFront = styled.div`
  width: 200px;
  height: fit-content;
  padding: 10px;
`;

const CardBack = styled.div`
  width: 200px;
  background-color: green;
`;

const MemoFrontContent = styled.div`
  margin-block: 52px;
`;
const MemoBackContent = styled.div`
  margin-block: 30px;
`;
const Phrase = styled.span`
  font-size: 43px;
  text-align: center;
`;

export default MainPage;

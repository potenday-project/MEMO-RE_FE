import { styled } from "styled-components";
import MainLayout from "../../components/MainLayout";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { FormProps, MemoCardProps, MemoStatusProps } from "../../config/types";

const MainPage = () => {
  const [memoList, setMemoList] = useState([
    {
      keyword: "핵심키워드를 길게 적은 버전 어쩌구 저쩌구",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tag: [
        "태그1",
        "태그2",
        "태그3",
        "태그4",
        "태그5",
        "태그6",
        "감각과디자인",
        "더미태그",
      ],
    },
    {
      keyword: "핵심키워드2",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tag: [],
    },
    {
      keyword: "핵심키워드3",
      content: ``,
      tag: [
        "태그1",
        "태그2",
        "태그3",
        "태그4",
        "태그5",
        "태그6",
        "감각과디자인",
        "더미태그",
        "어쩌고",
      ],
    },
    {
      keyword: "핵심키워드4",
      content: ``,
      tag: [],
    },
    {
      keyword: "Possiblity",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tag: ["태그1", "태그2", "태그3"],
    },
    {
      keyword: "핵심키워드이거20글자까지사오육칠팔구십",
      content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam voluptate, dolorem rem incidunt perspiciatis dicta quam accusamus voluptas aperiam similique non nisi sequi temporibus tempore neque nulla. Consequatur, veritatis voluptas?`,
      tag: [
        "태그1",
        "태그2",
        "태그3",
        "태그4",
        "태그5",
        "태그6",
        "감각과디자인",
        "더미태그",
      ],
    },
  ]);
  const [selected, setSelected] = useState("");

  const handleClickCard = (item: FormProps) => {
    if (!item.content && !!!item.tag.length) {
      return;
    }
    setSelected(item.keyword);
    if (item.keyword === selected) {
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
              onClick={() => handleClickCard(memo)}
              key={memo.keyword}
              selected={selected === memo.keyword}
            >
              <CardController>
                <button>수정</button>
                <button>삭제</button>
              </CardController>
              {selected === memo.keyword ? (
                <CardBack>
                  <MemoBackContent content={!!memo.content}>
                    {memo.content}
                  </MemoBackContent>
                  {memo.tag.length > 0 ? (
                    <TagWrap content={!!memo.content}>
                      {memo.tag.map((item, idx) => (
                        <MemoTag key={idx}>#{item}</MemoTag>
                      ))}
                    </TagWrap>
                  ) : null}
                </CardBack>
              ) : (
                <CardFront>
                  <MemoFrontContent>{memo.keyword}</MemoFrontContent>
                  <StatusBox content={!!memo.content} tag={!!memo.tag.length} />
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: fit-content;
  gap: 16px;
`;

// 카드 한 칸
const CardWrap = styled.div<MemoCardProps>`
  position: relative;
  width: 100%;
  height: fit-content;
  border-top: 1px solid #000;
  border-bottom: ${({ selected }) =>
    selected ? `transparent` : `1px solid #000`};
  border-inline: ${({ selected }) => (selected ? `1px solid #000` : `none`)};
  margin-bottom: 30px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 동작 */
  }
  -ms-overflow-style: none; // IE
  scrollbar-width: none; // 파이어폭스
`;

// 카드 수정/삭제 버튼
const CardController = styled.div`
  position: absolute;
  right: 0;
  top: -30px;
  button {
    padding: 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
`;

// 카드 앞면
const CardFront = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: fit-content;
  padding-block: 52px;
`;

// 카드 앞면 콘텐츠
const MemoFrontContent = styled.div`
  display: flex;
  justify-content: center;
  width: 75%;
  font-size: 20px;
  font-weight: 700;
  line-height: 26px;
`;

// 상태박스
const StatusBox = styled.div<MemoStatusProps>`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  margin-bottom: -1px;
  background-color: ${({ content, tag }) =>
    content && tag ? `#000` : `transparent`};
  border-inline: ${({ content, tag }) =>
    content && !tag ? `1px solid #000` : `none`};
  border-block: ${({ content, tag }) =>
    !content && tag ? `1px solid #000` : `none`};
  box-sizing: border-box;
`;

// 카드 뒷면
const CardBack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 카드 뒷면 콘텐츠
const MemoBackContent = styled.div<MemoStatusProps>`
  display: ${({ content }) => (content ? `flex` : `none`)};
  justify-content: center;
  width: 75%;
  padding-block: 30px;
  line-height: 25px;
`;

// 카드 내 태그리스트
const TagWrap = styled.div<MemoStatusProps>`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-block: ${({ content }) => (content ? "0" : "16px")};
`;

// 카드 내 각 태그
const MemoTag = styled.div`
  border-block: 1px solid #000;
  padding-inline: 10px;
  box-sizing: border-box;

  font-size: 12px;
  font-weight: 700;
  line-height: 29px;
`;

// 빈 메모 메인 문구
const Phrase = styled.span`
  font-size: 43px;
  text-align: center;
`;

export default MainPage;

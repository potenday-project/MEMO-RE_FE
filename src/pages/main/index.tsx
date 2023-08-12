import { styled } from "styled-components";
import MainLayout from "../../components/MainLayout";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import {
  FormProps,
  MainEmptyProps,
  MemoCardProps,
  MemoStatusProps,
  RootState,
} from "../../config/types";
import { Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMemoList,
  setMemoList,
  updateMemo,
} from "../../features/memoList/memoListSlice";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const MainPage = () => {
  const [selected, setSelected] = useState<FormProps>({
    keyword: "",
    content: "",
    tag: [],
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState<FormProps[]>([]); // GET 조회해온 값
  const [page, setPage] = useState(0); // 요청할 페이지 상태값
  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const tagList = useSelector((state: RootState) => state.tagList);
  const memoList: FormProps[] = useSelector(
    (state: RootState) => state.memoList
  );

  const getListData = async () => {
    // 요청 코드 (메모 조회)
    try {
      const res = await axios.get(`/memo?pageNumber=${page}`);
      console.log("메모 조회", res);
      if (res.status === 200) {
        // 받아오는 값 확인후에
        // dispatch로 메모 리스트 상태관리 코드 작성하기
        dispatch(setMemoList(res));
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log("메모 조회 에러", error);
    }
  };

  useEffect(() => {
    if (inView) {
      if (memoList.length >= 12) {
        // getListData();
        dispatch(
          setMemoList({
            keyword: `더미${page}`,
            content: "더미",
            tag: [],
          })
        );
        setPage((prev) => prev + 1);
      }
    }
  }, [inView]);

  // 태그 옵션
  const options = tagList.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  // 메모 클릭
  const handleClickCard = (item: FormProps) => {
    setSelected({
      ...selected,
      keyword: item.keyword,
      content: item.content,
      tag: item.tag,
    });
    if (item.keyword === selected.keyword) {
      setSelected({
        ...selected,
        keyword: "",
        content: "",
        tag: [],
      });
    }
  };

  // 메모 수정
  const onEditForm = async (curMemo: FormProps) => {
    dispatch(updateMemo(selected));
    setEditModalOpen(false);

    // 요청 코드 (메모 수정)
    try {
      const res = await axios.patch("/memo", {
        originKey: curMemo.keyword,
        newKey: selected.keyword,
        content: selected.content,
        tag: selected.tag,
      });
      if (res.status === 200) {
        console.log("/mainSidebar - 태그 등록 요청!", res);
        // 메모리스트 다시 가져오기
      }
    } catch (error) {
      // 에러 처리
      console.log("/main Sidebar 태그 추가 에러", error);
      // NOT_FOUND: 해당 키워드 메모가 없음
      // BAD: 본인 메모가 아님
    }
  };

  // 메모 삭제
  const onDeleteMemo = async (memo: FormProps) => {
    // 요청 코드 (메모 삭제)
    try {
      dispatch(deleteMemoList(memo.keyword));
      const res = await axios.delete(`/tag?name=${memo.keyword}`);
      if (res.status === 200) {
        console.log("메모 삭제 Response", res);
      }
    } catch (error) {
      console.log("메모 삭제 에러", error);
    }
  };

  return (
    <MainLayout>
      <Sidebar />
      <Contents $empty={!memoList.length}>
        {memoList.length ? (
          memoList.map((memo: FormProps) => (
            <CardWrap
              key={memo.keyword}
              selected={selected.keyword === memo.keyword}
            >
              <Modal
                className="memoAddModal"
                title="메모 수정"
                centered
                open={editModalOpen}
                onOk={() => onEditForm(memo)}
                onCancel={() => setEditModalOpen(false)}
                okText="수정"
                cancelText="취소"
              >
                <LineWrap>
                  <Title>
                    <span className="must">*</span>메타 키워드:
                  </Title>
                  <Input
                    placeholder="핵심 키워드"
                    showCount
                    maxLength={20}
                    value={selected.keyword}
                    onChange={(e) =>
                      setSelected({ ...selected, keyword: e.target.value })
                    }
                  />
                </LineWrap>
                <LineWrap>
                  <Title>중요한 이유:</Title>
                  <TextArea
                    showCount
                    maxLength={100}
                    value={selected.content}
                    placeholder="위의 키워드가 중요하다고 생각한 이유를 함께 적어놓으면 나중에 활용하는데 도움이 됩니다"
                    onChange={(e) =>
                      setSelected({ ...selected, content: e.target.value })
                    }
                  />
                </LineWrap>
                <LineWrap>
                  <Title>주제 태그:</Title>
                  <Select
                    mode="multiple"
                    placeholder="태그를 선택해주세요"
                    options={options}
                    className="tagSelectInput"
                    value={selected.tag}
                    onSelect={(value) =>
                      setSelected({
                        ...selected,
                        tag: [...selected.tag, value],
                      })
                    }
                    onDeselect={(value) =>
                      setSelected({
                        ...selected,
                        tag: selected.tag.filter((v) => v !== value),
                      })
                    }
                  />
                </LineWrap>
              </Modal>
              {selected.keyword === memo.keyword ? (
                <>
                  <CardController>
                    <button onClick={() => setEditModalOpen(true)}>수정</button>
                    <button onClick={() => onDeleteMemo(memo)}>삭제</button>
                  </CardController>
                  <MemoBack onClick={() => handleClickCard(memo)}>
                    <MemoBackContent $content={!!memo.content}>
                      {memo.content}
                    </MemoBackContent>
                    {memo.tag.length > 0 ? (
                      <TagWrap $content={!!memo.content}>
                        {memo.tag.map((item, idx) => (
                          <MemoTag key={idx}>#{item}</MemoTag>
                        ))}
                      </TagWrap>
                    ) : null}
                  </MemoBack>
                </>
              ) : (
                <MemoFront onClick={() => handleClickCard(memo)}>
                  <MemoFrontContent>{memo.keyword}</MemoFrontContent>
                  <StatusBox
                    $content={!!memo.content}
                    $tag={!!memo.tag.length}
                  />
                </MemoFront>
              )}
            </CardWrap>
          ))
        ) : (
          <Phrase>Possibility Becomes Everything</Phrase>
        )}
        <ScrollObserver ref={ref} />
      </Contents>
    </MainLayout>
  );
};

const Contents = styled.div<MainEmptyProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 60px;
  column-gap: 20px;
  width: 100%;
  height: ${({ $empty }) => ($empty ? `100%` : `fit-content`)};
  place-items: ${({ $empty }) => ($empty ? `center` : `none`)};
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
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 동작 */
  }
  -ms-overflow-style: none; // IE
  scrollbar-width: none; // 파이어폭스
`;

// 메모 수정/삭제 버튼
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

// 메모 앞면
const MemoFront = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding-block: 52px;
  height: 80px;
`;

// 메모 앞면 콘텐츠
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
  background-color: ${({ $content, $tag }) =>
    $content && $tag ? `#000` : `transparent`};
  border-inline: ${({ $content, $tag }) =>
    $content && !$tag ? `1px solid #000` : `none`};
  border-block: ${({ $content, $tag }) =>
    !$content && $tag ? `1px solid #000` : `none`};
  box-sizing: border-box;
`;

// 메모 뒷면
const MemoBack = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 메모 뒷면 콘텐츠
const MemoBackContent = styled.div<MemoStatusProps>`
  display: ${({ $content }) => ($content ? `flex` : `none`)};
  justify-content: center;
  width: 75%;
  padding-block: 30px;
  line-height: 25px;
`;

// 메모 내 태그리스트
const TagWrap = styled.div<MemoStatusProps>`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-block: ${({ $content }) => ($content ? "0" : "16px")};
`;

// 메모 내 각 태그
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
  grid-column: span 3;
  font-size: 43px;
  text-align: center;
`;

const ScrollObserver = styled.div`
  position: absolute;
  bottom: 0;
`;

const LineWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  input {
    width: 300px;
  }
`;

const Title = styled.span`
  font-size: 16px;
  .must {
    color: red;
  }
`;

export default MainPage;

import { styled } from "styled-components";
import AddButton from "../Icons/AddButton";
import DeleteButton from "../Icons/DeleteButton";
import { useEffect, useState } from "react";
import { message, Modal, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  ControllerProps,
  FormProps,
  RootState,
  TagListProps,
} from "../../config/types";
import { useDispatch, useSelector } from "react-redux";
import { deleteTagList, setTagList } from "../../features/tagList/tagListSlice";
import { setMemoList } from "../../features/memoList/memoListSlice";
import axios from "axios";
import {
  BAD,
  DUPLICATE,
  NOT_VALID,
  SIZE,
  USER_NOT_FOUND,
} from "../../config/errorCode";
import { useNavigate } from "react-router-dom";

const ADD = "ADD";
const DEL = "DEL";

const Sidebar = () => {
  const [addable, setAddable] = useState(false);
  const [deletable, setDeletable] = useState(false);
  const [tag, setTag] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [checkedTag, setCheckedTag] = useState("");
  const [memoModalOpen, setMemoModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState<FormProps>({
    keyword: "",
    content: "",
    tag: [],
  });
  const [page, setPage] = useState(0); // 요청할 페이지 상태값

  const dispatch = useDispatch();
  const tagList = useSelector((state: RootState) => state.tagList);

  const [messageApi, contextHolder] = message.useMessage();
  const { confirm } = Modal;
  const options: object[] = tagList.map((tagVal) => {
    return { label: tagVal, value: tagVal };
  });
  const navigate = useNavigate();

  const isEditing = addable === true || deletable === true ? true : false;

  // 알림
  const showMessage = (msg: string) => {
    messageApi.open({
      type: "success",
      content: msg,
      duration: 1,
      className: "newTagMsg",
    });
  };

  // 태그 삭제
  const showConfirm = () => {
    confirm({
      icon: null,
      title: "선택한 태그를 정말 삭제하시겠습니까?",
      okText: "확인",
      cancelText: "취소",
      centered: true,
      onOk() {
        dispatch(deleteTagList(checkedTag));
      },
    });
  };

  // 취소 버튼
  const handleCancelButton = () => {
    if (addable) {
      setTag("");
      setInputCount(0);
      setAddable(false);
    }
    if (deletable) setDeletable(false);
  };

  // 태그 추가/삭제 버튼
  const handleEditButton = async (type: string) => {
    if (type === ADD) {
      if (tagList.length >= 10) {
        showMessage("✅ 10개 태그를 모두 입력하셨어요!");
        setTag("");
        setInputCount(0);
        return;
      }
      if (!tag) {
        showMessage("👀 태그를 입력해주세요");
        return;
      }

      // 요청 코드 (태그 추가)
      try {
        dispatch(setTagList(tag));
        setTag("");
        setInputCount(0);

        const res = await axios.post("/tag", { name: tag });
        if (res.status === 200) {
          showMessage("✨ 태그를 추가했어요!");
        }
      } catch (e: any) {
        const { response } = e.response.data;
        if (response === USER_NOT_FOUND) {
          navigate("/");
        }
        if (response === NOT_VALID) {
          showMessage("😵‍💫 태그 추가에 실패했어요");
        }
        if (response === DUPLICATE) {
          showMessage("🤔 이미 입력한 태그예요. 다시 입력해주세요");
        }
      }
    }
    if (type === DEL) {
      if (!checkedTag) return;
      showConfirm();
      setCheckedTag("");

      // 요청 코드 (태그 삭제) - 예정
      try {
        const res = await axios.delete("/tag");
        if (res.status === 200) {
          console.log("태그 삭제 Response", res);
        }
      } catch (error) {
        // 에러 처리
        console.log("태그 삭제 에러", error);
        // USER_NOT_FOUND: 로그인된 유저가 아님
        // NOT_VALID: 태그 양식 문제
      }
    }
  };

  // 추가 시 글자수 카운트
  const handleInputCount = (value: string) => {
    setTag(value);
    setInputCount(value.length);
  };

  // 추가 시 인풋 엔터 핸들러
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditButton(ADD);
    }
  };

  // 태그 단일 체크
  const checkHandler = (tag: string) => {
    setCheckedTag(tag);
    if (checkedTag === tag) {
      setCheckedTag("");
    }
  };

  // 메모 등록
  const onSubmitForm = async () => {
    if (!modalForm.keyword) {
      alert("키워드를 입력해주세요!");
      return;
    }

    // 요청 코드 (메모 추가)
    try {
      dispatch(setMemoList(modalForm));
      const res = await axios.post("/memo", modalForm);
      if (res.status === 200) {
        setModalForm({ ...modalForm, keyword: "", content: "", tag: [] });
        setMemoModalOpen(false);
        // 메모 추가 - 메모 조회 (추가될 예정)
        // const getRes = await axios.get(`/main/main?tag=태그&page=${page}`);
        // if (getRes.status === 200) {
        //   dispatch(setMemoList(res));
        //   setMemoList(res);
        // }
      }
    } catch (e: any) {
      const { response } = e.response.data;
      if (response === DUPLICATE) {
        alert("중복된 키워드입니다. 다른 키워드를 입력해주세요");
      }
      if (response === BAD) {
        alert("메모 양식이 올바르지 않습니다. 다시 확인해주세요");
      }
    }
  };

  // 메모 조회
  const getTagMemo = async (tagName: string) => {
    // 요청 코드 (태그별 메모 조회)
    try {
      const res = await axios.get(`/memo?tag=${tagName}&page=${page}`);
      if (res.status === 200) {
        dispatch(setMemoList(res));
        setMemoList(res);
      }
    } catch (e: any) {}
  };

  return (
    <SidebarContainer>
      {contextHolder}
      <Modal
        className="memoAddModal"
        title="메모하기"
        centered
        open={memoModalOpen}
        onOk={onSubmitForm}
        onCancel={() => {
          setModalForm({
            keyword: "",
            content: "",
            tag: [],
          });
          setMemoModalOpen(false);
        }}
        okText="등록"
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
            value={modalForm.keyword}
            onChange={(e) =>
              setModalForm({ ...modalForm, keyword: e.target.value })
            }
          />
        </LineWrap>
        <LineWrap>
          <Title>중요한 이유:</Title>
          <TextArea
            showCount
            maxLength={100}
            value={modalForm.content}
            placeholder="위의 키워드가 중요하다고 생각한 이유를 함께 적어놓으면 나중에 활용하는데 도움이 됩니다"
            onChange={(e) =>
              setModalForm({ ...modalForm, content: e.target.value })
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
            value={modalForm.tag}
            onSelect={(value) =>
              setModalForm({ ...modalForm, tag: [...modalForm.tag, value] })
            }
            onDeselect={(value) =>
              setModalForm({
                ...modalForm,
                tag: modalForm.tag.filter((v) => v !== value),
              })
            }
          />
        </LineWrap>
      </Modal>
      <TopWrap>
        <h2>All</h2>
        <span>미분류</span>
      </TopWrap>
      <TagContainer>
        {!isEditing ? (
          <Controller $isEditing={isEditing}>
            <AddButton onClick={() => setAddable(true)} />
            <DeleteButton onClick={() => setDeletable(true)} />
          </Controller>
        ) : addable ? (
          <AddWrap>
            <Controller $isEditing={isEditing}>
              <TextButton onClick={() => handleCancelButton()}>취소</TextButton>
              <TextButton onClick={() => handleEditButton(ADD)}>
                추가
              </TextButton>
            </Controller>
            <AddInput
              type="text"
              name="name"
              value={tag}
              maxLength={20}
              onChange={({ target: { value } }) => handleInputCount(value)}
              onKeyDownCapture={(e) => enterHandler(e)}
            />
            <TextCounting>{inputCount} / 20</TextCounting>
          </AddWrap>
        ) : (
          <Controller $isEditing={isEditing}>
            <TextButton onClick={() => handleCancelButton()}>취소</TextButton>
            <TextButton onClick={() => handleEditButton(DEL)}>삭제</TextButton>
          </Controller>
        )}
        {deletable ? (
          <TagList $isEditing={addable}>
            {tagList.map((tag, idx) => (
              <TagWrap key={idx}>
                <Tag>#{tag}</Tag>
                <label>
                  <input
                    type="checkbox"
                    checked={tag === checkedTag}
                    onChange={(e) => checkHandler(tag)}
                  />
                  <CheckCircle className="checkbox" />
                </label>
              </TagWrap>
            ))}
          </TagList>
        ) : (
          <TagList $isEditing={addable}>
            {tagList.map((tag, idx) => (
              <Tag key={idx} onClick={() => getTagMemo(tag)}>
                #{tag}
              </Tag>
            ))}
          </TagList>
        )}
      </TagContainer>
      <MemoButton onClick={() => setMemoModalOpen(true)}>메모하기</MemoButton>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: relative;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 44px;
  box-sizing: border-box;
  font-size: 20px;
  line-height: 29px;
  h2 {
    font-weight: 700;
  }
  span {
    font-weight: 400;
  }
`;

const TagContainer = styled.div`
  width: 100%;
`;

const Controller = styled.div<ControllerProps>`
  display: flex;
  gap: ${({ $isEditing }) => (!$isEditing ? `8px` : `16px`)};
  margin-bottom: ${({ $isEditing }) => (!$isEditing ? `17px` : `20px`)};
`;

const TextButton = styled.button`
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.176px;
  font-size: 16px;
`;

const AddWrap = styled.div`
  margin-bottom: 25px;
`;

const AddInput = styled.input`
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: 600;
  line-height: 29px;
  padding-bottom: 4px;
  border-bottom: 1px solid #000;
  &:focus {
    border-bottom: 1px solid #000;
  }
`;

const TextCounting = styled.span`
  display: block;
  width: 160px;
  margin-top: 6px;
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.132px;
`;

const TagList = styled.ul<TagListProps>`
  display: flex;
  flex-direction: column;
  row-gap: ${({ $isEditing }) => (!$isEditing ? `12px` : `4px`)};
`;

const TagWrap = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 9px;

  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"]:checked + .checkbox {
    background-color: #d9d9d9;
  }
`;

const Tag = styled.li`
  width: 131px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 29px;
  cursor: pointer;
`;

const CheckCircle = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #000;
  border-radius: 50px;
`;

const MemoButton = styled.button`
  position: fixed;
  bottom: 80px;
  width: 160px;
  display: block;
  padding-bottom: 18px;
  border-bottom: 1px solid #000;

  color: #000;
  font-size: 30px;
  font-weight: 700;
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

export default Sidebar;

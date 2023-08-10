import { styled } from "styled-components";
import AddButton from "../Icons/AddButton";
import DeleteButton from "../Icons/DeleteButton";
import React, { useEffect, useState } from "react";

interface ControllerProps {
  $isEditing: boolean;
}
interface TagListProps {
  $isEditing: boolean;
}

const Sidebar = () => {
  const [addable, setAddable] = useState(false);
  const [deletable, setDeletable] = useState(false);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([
    "지속가능한인공지능",
    "감각과철학입문학",
    "감각과지각",
  ]);
  const isEditing = addable === true || deletable === true ? true : false;

  useEffect(() => {
    console.log("편집중", isEditing);
  }, [isEditing]);

  const handleCancelButton = () => {
    if (addable) setAddable(false);
    if (deletable) setDeletable(false);
  };

  const handleEditButton = () => {
    if (addable) {
      if (tagList.length >= 10) {
        alert("태그 10개를 모두 입력하셨어요!");
        return;
      }
      setTagList([...tagList, tag]);
      setTag("");
    }
    if (deletable) {
    }
  };

  return (
    <SidebarContainer>
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
              <TextButton onClick={() => handleEditButton()}>추가</TextButton>
            </Controller>
            <AddInput
              type="text"
              name="name"
              value={tag}
              onChange={({ target: { value } }) => setTag(value)}
            />
            <TextCounting>10 / 10</TextCounting>
          </AddWrap>
        ) : (
          <Controller $isEditing={isEditing}>
            <TextButton onClick={() => handleCancelButton()}>취소</TextButton>
            <TextButton onClick={() => handleEditButton()}>삭제</TextButton>
          </Controller>
        )}
        <TagList $isEditing={addable}>
          {tagList.map((tag, idx) => (
            <Tag key={idx}>#{tag}</Tag>
          ))}
        </TagList>
      </TagContainer>
      <MemoButton>메모하기</MemoButton>
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
  height: 100%;
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

const Tag = styled.li`
  width: 131px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 29px;
`;

const MemoButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 160px;
  display: block;
  padding-bottom: 18px;
  border-bottom: 1px solid #000;

  color: #000;
  font-size: 30px;
  font-weight: 700;
`;

export default Sidebar;

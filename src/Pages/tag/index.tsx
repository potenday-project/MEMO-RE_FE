import { styled } from "styled-components";
import GridLayout from "../../components/GridLayout";
import SubmitButton from "../../components/SubmitButton";
import { StyledInput } from "../../components/CommonInput";
import { useEffect, useState } from "react";

type TagsType = string[];

const TagPage = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [tags, setTags] = useState<TagsType>([]);

  useEffect(() => {}, [tags]);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // 엔터 이벤트 중복 방지
    if (e.key === "Enter") {
      if (tags.length === 3) {
        setCurrentValue("");
        alert("주제 3개를 모두 입력했어요!🙆🏻‍♀️");
        return;
      }
      setTags([...tags, currentValue]);
      setCurrentValue("");
    }
  };

  const handleStart = () => {
    console.log("시작하기");
  };

  return (
    <GridLayout logo={true}>
      <Contents>
        <Description>관심가는 주제 3개를 입력해주세요</Description>
        <TagContainer>
          {tags ? tags.map((tag, idx) => <Tag key={idx}>#{tag}</Tag>) : null}
        </TagContainer>
      </Contents>
      <TagInput
        type="text"
        placeholder="#제외 10자이내"
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDownCapture={(e) => addTag(e)}
        value={currentValue}
      />
      <SubmitButton onClick={handleStart}>시작하기</SubmitButton>
    </GridLayout>
  );
};

const Contents = styled.main`
  position: relative;
  grid-column: span 12;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Description = styled.p`
  position: absolute;
  top: 0;
  color: #000;
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
`;

const TagContainer = styled.div`
  grid-column: 1fr;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 59px;
`;

const Tag = styled.span`
  color: #000;
  font-size: 36px;
  font-weight: 700;
`;

const TagInput = styled(StyledInput)`
  position: absolute;
  bottom: 80px;
  left: 80px;
  display: block;

  padding-bottom: 0;
  width: 248px;
  line-height: 42px;
  letter-spacing: -0.22px;
`;

export default TagPage;

import { styled } from "styled-components";
import GridLayout from "../../components/GridLayout";
import SubmitButton from "../../components/SubmitButton";
import { StyledInput } from "../../components/CommonInput";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const handleStart = async () => {
    console.log("시작하기");
    try {
      const res = await axios.post("/", { tag: tags });
      if (res.status === 200) {
        console.log("태그 정보 전송 완료!", res);
      }
    } catch (error) {
      // 에러 처리
      // USER_NOT_FOUND : 로그인 유저가 아닐 때
      // TAG_NOT_VALID : 태그 길이가 너무 김
    }
  };

  return (
    <GridLayout logo={true}>
      <Contents>
        <LeftSide>
          <Description>관심가는 주제 3개를 입력해주세요</Description>
          <TagContainer>
            {tags ? tags.map((tag, idx) => <Tag key={idx}>#{tag}</Tag>) : null}
          </TagContainer>
          <TagInput
            type="text"
            placeholder="#제외 10자이내"
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDownCapture={(e) => addTag(e)}
            value={currentValue}
          />
        </LeftSide>
        <RightSide>
          <SubmitButton onClick={handleStart}>시작하기</SubmitButton>
        </RightSide>
      </Contents>
    </GridLayout>
  );
};

const Contents = styled.main`
  grid-column: span 12;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftSide = styled.section`
  position: relative;
`;

const RightSide = styled.section`
  position: relative;
`;

const Description = styled.p`
  position: absolute;
  top: 0;
  color: #000;
  font-size: 20px;
  font-weight: 400;
  line-height: 29px;
  margin-top: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  gap: 59px;
`;

const Tag = styled.span`
  color: #000;
  font-size: 36px;
  font-weight: 700;
`;

const TagInput = styled(StyledInput)`
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;

  padding-bottom: 0;
  width: 248px;
  line-height: 42px;
  letter-spacing: -0.22px;
`;

export default TagPage;

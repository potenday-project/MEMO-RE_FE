import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import GridHeaderLayout from "../../components/GridHeaderLayout";
import SubmitButton from "../../components/SubmitButton";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = async () => {
    const data = { username, password };

    try {
      const res = await axios.post("/signUp", data);
      console.log("회원가입 응답", res);

      if (res.status === 200) {
        // 응답 받으면
      }
    } catch (error) {
      // 에러처리
      console.log("회원가입 에러", error);
    }
  };

  return (
    <GridHeaderLayout>
      <InputField>
        <InputWrap>
          <span>아이디</span>
          <StyledInput
            type="text"
            name="username"
            placeholder="영어 소문자와 숫자 4자 이상 아이디"
            onChange={({ target: { value } }) => {
              setUsername(value);
            }}
          />
        </InputWrap>
        <InputWrap>
          <span>비밀번호</span>
          <StyledInput
            type="password"
            name="password"
            placeholder="문자, 숫자 6자 이상 비밀번호"
            className="pwInput"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
        </InputWrap>
      </InputField>
      <SubmitButton onClick={onSignUp}>회원가입하기</SubmitButton>
    </GridHeaderLayout>
  );
};

const InputField = styled.div`
  display: grid;
  grid-column: span 12;
  grid-row-gap: 44px;
  align-self: center;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  span {
    display: block;
    width: 74px;

    color: #000;
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
  }
`;

export const StyledInput = styled.input`
  width: 336px;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;

  color: #000;
  font-size: 20px;
  font-weight: 500;
  line-height: 19.2px;

  &.pwInput {
    font-size: 31px;
    line-height: 32.24px;
    letter-spacing: 5.27px;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.176px;
  }
  &:focus {
    border-bottom: 1px solid #000;
  }
`;

export default SignUpPage;

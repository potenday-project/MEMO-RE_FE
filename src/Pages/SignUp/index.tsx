import { styled } from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import GridHeaderLayout from "../../components/GridHeaderLayout";
import SubmitButton from "../../components/SubmitButton";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleIdBlur = async (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    console.log("아이디 유효성 체크");

    try {
      const res = await axios.post("/usernameValid", e.target.value);

      if (res.status === 200) {
        console.log("아이디 OK!");
      }
    } catch (error) {
      console.log("아이디 조건 에러", error);
      // NOT_VALID: 아이디 조건 이상
      // USERNAME_DUPL: 아이디 중복
    }
  };

  const handlePwBlur = async () => {
    console.log("비밀번호 유효성 체크");
    try {
      const res = await axios.post("/pwdValid", password);

      if (res.status === 200) {
        console.log("비밀번호 조건 체크 완료!");
      }
    } catch (error) {
      console.log("비밀번호 조건 에러", error);
      // NOT_VALID: 비밀번호 조건 이상
    }
  };

  const onSignUp = async () => {
    console.log("회원가입 클릭!");
    try {
      const data = { username, password };
      const res = await axios.post("/signUp", data);

      if (res.status === 200) {
        console.log("회원가입 완료!");
        navigate("/");
      }
    } catch (error) {
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
            onBlur={(e) => handleIdBlur(e)}
          />
        </InputWrap>
        <InputWrap>
          <span>비밀번호</span>
          <StyledInput
            type="password"
            name="password"
            placeholder="문자, 숫자 6자 이상 비밀번호"
            className="pwInput"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePwBlur}
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

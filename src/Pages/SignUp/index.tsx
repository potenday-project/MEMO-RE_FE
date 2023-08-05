import { styled } from "styled-components";
import HeaderLayout from "../../Components/HeaderLayout";
import CommonInput from "../../Components/CommonInput";
import { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    const data = { username, password };

    axios
      .post("/signUp", data)
      .then((res) => {
        if (res.status === 200) {
          // 응답 받으면
        }
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  return (
    <HeaderLayout>
      <SignUpContainer>
        <InputField>
          <CommonInput
            type="text"
            name="username"
            label="아이디"
            placeholder="영어 소문자와 숫자 4자 이상 아이디"
          />
          <CommonInput
            type="password"
            name="password"
            label="비밀번호"
            placeholder="문자, 숫자 6자 이상 비밀번호"
          />
        </InputField>
      </SignUpContainer>
      <SignUpButton onClick={onSignUp}>회원가입하기</SignUpButton>
    </HeaderLayout>
  );
};

const SignUpContainer = styled.div`
  min-height: inherit;
`;

const InputField = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const SignUpButton = styled.button`
  position: absolute;
  bottom: 80px;
  right: 80px;
  width: 248px;
  border-bottom: 1px solid #000;

  color: #000;
  font-size: 30px;
  font-weight: 700;
  line-height: 52px;
`;

export default SignUpPage;

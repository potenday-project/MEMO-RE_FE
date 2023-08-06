import { styled } from "styled-components";
import CommonInput from "../../components/CommonInput";
import { useState } from "react";
import axios from "axios";
import GridHeaderLayout from "../../components/GridHeaderLayout";
import SubmitButton from "../../components/SubmitButton";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    const data = { username, password };

    axios
      .post("/signUp", data)
      .then((res) => {
        console.log("✅회원가입 응답", res);
        if (res.status === 200) {
          // 응답 받으면
        }
      })
      .catch((error) => {
        // 에러 처리
        console.log("🚨회원가입 에러", error);
      });
  };

  return (
    <GridHeaderLayout>
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

export default SignUpPage;

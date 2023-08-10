import { styled } from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import GridLayout from "../../components/GridLayout";
import SubmitButton from "../../components/SubmitButton";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    success: "",
    error: "",
  });
  const navigate = useNavigate();

  const idReg = /[^?a-zA-Z0-9/]/; // 한글, 특수문자, 공백 체크
  const pwReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g; // 특수문자, 공백 체크

  const handleIdBlur = async (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const { value } = e.target;
    try {
      // JS 아이디 유효성 검사
      if (value.length <= 3) {
        setMessage({ ...message, error: "아이디가 너무 짧습니다" });
        return;
      }
      if (idReg.test(value)) {
        setMessage({
          ...message,
          error: "아이디에 한글, 특수문자, 공백을 포함할 수 없습니다",
        });
        return;
      }
      setMessage({ ...message, error: "" });

      // 서버 아이디 유효성 검사
      const res = await axios.post("/usernameValid", { username: username });
      if (res.status === 200) {
        setMessage({
          ...message,
          success: "사용 가능한 아이디입니다",
        });
        console.log("ID OK!", res);
      }
    } catch (error) {
      console.log("ID Failed", error); // NOT_VALID: 아이디 조건 이상

      // USERNAME_DUPL: 아이디 중복
      setMessage({
        ...message,
        error: "사용중인 아이디입니다",
      });
    }
  };

  const handlePwBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.target;
    try {
      // JS 비밀번호 유효성 검사
      if (value.length <= 5 || value.length >= 16) {
        setMessage({
          ...message,
          error: "비밀번호는 6글자 이상, 15글자 이하만 이용 가능합니다",
        });
        return;
      }
      if (pwReg.test(value)) {
        setMessage({
          ...message,
          error: "비밀번호에 특수문자, 공백을 포함할 수 없습니다",
        });
        return;
      }
      setMessage({ ...message, error: "" });
    } catch (erorr) {
      // 에러처리
    }
  };

  const onSignUp = async () => {
    try {
      if ([username, password].includes("")) {
        alert("빈 칸을 모두 입력해주세요!");
        return;
      }
      const data = { username: username, password: password };
      const res = await axios.post("/signUp", data);
      if (res.status === 200) {
        console.log("회원가입 완료", res);
        navigate("/");
      }
    } catch (error) {
      console.log("회원가입 에러", error);
    }
  };

  return (
    <GridLayout logo={true}>
      <Container>
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
              onChange={({ target: { value } }) => setPassword(value)}
              onBlur={(e) => handlePwBlur(e)}
            />
          </InputWrap>
          {message.error ? (
            <StatusMessage className="error">{message.error}</StatusMessage>
          ) : (
            <StatusMessage className="success">{message.success}</StatusMessage>
          )}
        </InputField>
        <SubmitButton onClick={onSignUp} disabled={!!message.error}>
          회원가입하기
        </SubmitButton>
      </Container>
    </GridLayout>
  );
};

const Container = styled.section`
  position: relative;
  grid-column: span 12;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputField = styled.div`
  display: grid;
  grid-row-gap: 44px;
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

const StyledInput = styled.input`
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

const StatusMessage = styled.p`
  font-size: 12px;
  text-align: center;
  &.error {
    color: red;
  }
  &.success {
    color: green;
  }
`;

export default SignUpPage;

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
    idSuccess: "",
    idError: "",
    pwError: "",
  });
  const navigate = useNavigate();

  const idReg =
    /^(?=.*[ㄱ-ㅎㅏ-ㅣ가-힣A-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/; // 한글, 대문자, 특수문자, 공백 체크
  const pwReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/g; // 특수문자, 공백 체크

  // 아이디 검사
  const handleIdBlur = async (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const { value } = e.target;
    try {
      if (value.length <= 3 || value.length >= 16) {
        setMessage({
          ...message,
          idError: "4~15자의 영문 소문자, 숫자만 사용 가능합니다",
        });
        return;
      }
      if (idReg.test(value)) {
        setMessage({
          ...message,
          idError: "한글, 대문자, 특수문자, 공백은 포함할 수 없습니다",
        });
        return;
      }
      setMessage({ ...message, idError: "" });

      // 요청 코드 (아이디 체크)
      const res = await axios.post("/usernameValid", { username: username });
      if (res.status === 200) {
        setMessage({
          ...message,
          idSuccess: "사용 가능한 아이디입니다",
        });
        console.log("ID OK!", res);
      }
    } catch (error) {
      console.log("/signup Error: 회원가입 에러", error);
      // USERNAME_DUPL: 아이디 중복
      // alert("사용중인 아이디입니다");

      // NOT_VALID: 아이디 조건 이상
      // alert("사용하라 수 없는 아이디입니다. 다른 아이디를 입력해주세요");
    }
  };

  // 비밀번호 검사
  const handlePwBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value } = e.target;
    try {
      if (value.length <= 5 || value.length >= 16) {
        setMessage({
          ...message,
          pwError: "6자 이상, 15글자 이하만 가능합니다.",
        });
        return;
      }
      if (pwReg.test(value)) {
        setMessage({
          ...message,
          pwError: "특수문자, 공백을 포함할 수 없습니다.",
        });
        return;
      }
      setMessage({ ...message, pwError: "" });
    } catch (erorr) {
      // 에러 처리
    }
  };

  const onSignUp = async () => {
    try {
      if ([username, password].includes("")) {
        alert("빈 칸을 모두 입력해주세요!");
        return;
      }
      if (message.idError || message.pwError) {
        return;
      }
      console.log("회원가입 요청");
      const data = { username: username, password: password };

      // 요청 코드 (회원가입)
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
            <StatusWrap>
              {message.idError ? (
                <StatusMessage className="error">
                  {message.idError}
                </StatusMessage>
              ) : (
                <StatusMessage className="success">
                  {message.idSuccess}
                </StatusMessage>
              )}
              <StyledInput
                type="text"
                name="username"
                placeholder="영어 소문자와 숫자 4자 이상 아이디"
                onChange={({ target: { value } }) => {
                  setUsername(value);
                }}
                onBlur={(e) => handleIdBlur(e)}
              />
            </StatusWrap>
          </InputWrap>
          <InputWrap>
            <span>비밀번호</span>
            <StatusWrap>
              {message.pwError ? (
                <StatusMessage className="error">
                  {message.pwError}
                </StatusMessage>
              ) : (
                <StatusMessage>{}</StatusMessage>
              )}
              <StyledInput
                type="password"
                name="password"
                placeholder="문자, 숫자 6자 이상 비밀번호"
                className="pwInput"
                onChange={({ target: { value } }) => setPassword(value)}
                onBlur={(e) => handlePwBlur(e)}
              />
            </StatusWrap>
          </InputWrap>
        </InputField>
        <SubmitButton onClick={onSignUp}>회원가입하기</SubmitButton>
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
  grid-row-gap: 28.5px;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: flex-end;
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
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.132px;
  &.error {
    color: #ff2424;
  }
  &.success {
    color: green;
  }
`;

const StatusWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

export default SignUpPage;

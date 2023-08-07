import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/token/accessTokenSlice";
import GridHeaderLayout from "../../components/GridHeaderLayout";
import SubmitButton from "../../components/SubmitButton";
import { styled } from "styled-components";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onLogin = async () => {
    const data = { username, password };
    try {
      const res = await axios.post("/login", data);
      const { token } = res.data;
      dispatch(setToken(token));

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      // 에러 처리
      console.log("로그인 에러", error);
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
            placeholder="아이디를 입력해주세요"
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
            placeholder="비밀번호를 입력해주세요"
            className="pwInput"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
        </InputWrap>
      </InputField>
      <SubmitButton onClick={onLogin}>로그인하기</SubmitButton>
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

export default LoginPage;

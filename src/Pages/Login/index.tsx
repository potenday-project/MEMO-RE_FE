import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/token/accessTokenSlice";
import GridHeaderLayout from "../../components/GridHeaderLayout";
import CommonInput from "../../components/CommonInput";
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
    } catch (e) {
      // 에러 처리
      console.log("로그인 에러", e);
    }
  };

  return (
    <GridHeaderLayout>
      <InputField>
        <CommonInput
          type="text"
          name="username"
          label="아이디"
          placeholder="아이디를 입력해주세요"
        />
        <CommonInput
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          className="loginPwInput"
        />
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

  input.loginPwInput {
    font-size: 31px;
    font-weight: 500;
    line-height: 32.34px;
    letter-spacing: 5.27px;
  }
`;

export default LoginPage;

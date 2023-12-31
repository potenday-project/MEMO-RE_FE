import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearToken, setToken } from "../../features/token/accessTokenSlice";
import GridLayout from "../../components/GridLayout";
import SubmitButton from "../../components/SubmitButton";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { LOGIN_FAIL } from "../../config/errorCode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      // 요청 코드 (로그인)
      const res = await axios.post("/login", { username, password });
      const { token } = res.data;
      dispatch(setToken(token));

      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 태그 리스트 조회 (요청 코드) - 예정
      // navigate("/tag"); // 보유중인 태그가 0개 일 때
      // navigate("/main"); // 태그가 있을 때
    } catch (e: any) {
      // 로그인 실패 시 auth clear
      axios.defaults.headers.common["Authorization"] = "";
      dispatch(clearToken);
      const { response } = e.response.data;
      if (response === LOGIN_FAIL) {
        alert("아이디 또는 비밀번호를 잘못입력했습니다. 다시 확인해주세요.");
      }
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

export default LoginPage;

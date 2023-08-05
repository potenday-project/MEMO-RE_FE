import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    const data = { username, password };

    axios
      .post("/login", data)
      .then((res) => {
        const { token } = res.data;
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      })
      .catch((error) => {
        // 에러 처리
      });
  };

  return <div>LoginPage</div>;
};

export default LoginPage;

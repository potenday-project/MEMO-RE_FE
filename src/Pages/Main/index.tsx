import { styled } from "styled-components";
import GridLayout from "../../components/GridLayout";
import { openApiAxios } from "../../config/api";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await openApiAxios.get("/search");
      console.log("내가 보낸 요청", res);
      if (res.status === 200) {
        // 응답 받으면
        console.log("응답 완료!");
        console.log(res.data);
      }
    } catch (error) {
      // 에러처리
      console.log("고양이 에러", error);
    }
  };
  return (
    <GridLayout>
      <Dummy>
        <JustButton onClick={handleClick}>API 테스트</JustButton>
        <JustButton onClick={() => navigate("/signup")}>회원가입</JustButton>
        <JustButton onClick={() => navigate("/login")}>로그인</JustButton>
        <JustButton onClick={() => navigate("/tag")}>
          태그 입력받으러 가기
        </JustButton>
      </Dummy>
    </GridLayout>
  );
};

const Dummy = styled.section`
  display: grid;
  grid-column: span 12;
  padding: 50px;
`;

const JustButton = styled.button`
  border: 1px solid black;
  box-sizing: border-box;
  width: 150px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export default MainPage;

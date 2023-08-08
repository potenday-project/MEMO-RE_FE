import GridLayout from "../../components/GridLayout";
import { openApiAxios } from "../../config/api";

const MainPage = () => {
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
      MainPage
      <button onClick={handleClick}>API 테스트</button>
    </GridLayout>
  );
};

export default MainPage;

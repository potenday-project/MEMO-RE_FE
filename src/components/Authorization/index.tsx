import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../config/types";
import { useNavigate } from "react-router-dom";

const Authorization = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.accessToken);

  useEffect(() => {
    if (!auth) {
      alert("권한이 없습니다");
      navigate("/");
    }
  }, [auth, navigate]);

  return <div>{children}</div>;
};

export default Authorization;

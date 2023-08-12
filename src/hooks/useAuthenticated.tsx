import { useSelector } from "react-redux";
import { RootState } from "../config/types";

const useAuthenticated = () => {
  const auth = useSelector((state: RootState) => state.accessToken);
  return !!auth;
};

export default useAuthenticated;

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main";
import SignUpPage from "./pages/signUp";
import LoginPage from "./pages/login";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./app/store";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true; // 쿠키를 주고 받을 수 있음

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/main";
import SignUpPage from "./pages/signUp";
import LoginPage from "./pages/login";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./app/store";
import TagPage from "./pages/tag";

axios.defaults.baseURL = "https://alwaysalsoholiday.xyz";
axios.defaults.withCredentials = true;

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
  {
    path: "/tag",
    element: <TagPage />,
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

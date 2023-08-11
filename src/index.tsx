import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/antd.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { routerInfo } from "./pages/router";
import { ConfigProvider } from "antd";

axios.defaults.baseURL = "http://alwaysalsoholiday.xyz:8080";
axios.defaults.withCredentials = true;

const router = createBrowserRouter(routerInfo);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#000",
            colorPrimaryHover: "#000",
            colorPrimaryBorder: "#000,",
            colorPrimaryBorderHover: "#000",
            colorPrimaryActive: "#000",
            colorPrimaryText: "#fff",
          },
          Select: {
            colorPrimary: "#000",
            colorPrimaryHover: "#000",
            controlItemBgActive: "#d9d9d9",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
);

import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { routerInfo } from "./pages/router";

axios.defaults.baseURL = "http://alwaysalsoholiday.xyz:8080";
axios.defaults.withCredentials = true;

const router = createBrowserRouter(routerInfo);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

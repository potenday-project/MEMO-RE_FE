import Authorization from "../components/Authorization";
import NotFound from "./error";
import LoginPage from "./login";
import MainPage from "./main";
import RootPage from "./root";
import SignUpPage from "./signUp";
import TagPage from "./tag";

export const routerChildrenInfo = [
  {
    index: true,
    element: <RootPage />,
    withAuthorization: false,
  },
  {
    path: "main",
    element: <MainPage />,
    withAuthorization: true,
  },
  {
    path: "signup",
    element: <SignUpPage />,
    withAuthorization: false,
  },
  {
    path: "login",
    element: <LoginPage />,
    withAuthorization: false,
  },
  {
    path: "tag",
    element: <TagPage />,
    withAuthorization: true,
  },
];

export const routerWithAuth = routerChildrenInfo.map((route) => {
  return route.withAuthorization
    ? {
        path: route.path,
        element: <Authorization>{route.element}</Authorization>,
      }
    : {
        index: true,
        path: route.path,
        element: route.element,
      };
});

export const routerInfo = [
  {
    path: "/",
    errorElement: <NotFound />,
    children: routerWithAuth,
  },
];

import Authorization from "./components/Authorization";
import NotFound from "./pages/error";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import RootPage from "./pages/root";
import SignUpPage from "./pages/signUp";
import TagPage from "./pages/tag";

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

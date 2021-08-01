import Main from "./layouts/Main";
import Home from "./views/Home"
import Redirect from "./views/Redirect";

const routes = [
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: ":url", element: <Redirect /> },
      { path: "*", element: <Home /> },
    ],
  },
];

export default routes;

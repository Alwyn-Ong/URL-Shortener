import Main from "./layouts/Main";
import Home from "./views/Home"
import Redirect from "./views/Redirect";

const routes = [
  {
    path: "/",
    // element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: ":url", element: <Redirect /> },
      { path: "*", element: <Home /> },
    ],
  },
];

export default routes;

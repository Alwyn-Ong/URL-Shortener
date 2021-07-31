import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import Home from "./views/Home";
import { Toaster } from "react-hot-toast";
import Error from "./views/Error";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

let theme = createTheme();

// theme.typography.h3 = {
//   fontSize: "1.2rem",
//   "@media (min-width:600px)": {
//     fontSize: "1.5rem",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "2rem",
//   },
// };

theme = responsiveFontSizes(theme);

function App() {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      {/* <Home /> */}
      {/* <Error/> */}
      {routing}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

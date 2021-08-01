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

theme = responsiveFontSizes(theme);

function App() {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      {routing}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;

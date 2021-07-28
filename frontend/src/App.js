import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import React from "react";
import "./App.css";
import "react-typist/dist/Typist.css";
import Typist from "react-typist";
import TypistLoop from "./components/TypistLoop";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    // maxWidth:"80vh"
  },
}));

function App() {
  const classes = useStyles();

  const [url, setUrl] = React.useState("www.abc.com");
  const handleChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  };

  const handleSubmit = () => {
    alert(`${url} submitted!`);
  };

  // const url = "www.abc.com/";
  const longSuffix = "def/ghi/jkl";
  const shortSuffix = "abc123";

  const [count, setCount] = React.useState(1);

  React.useEffect(() => {
    // document.title = `You clicked ${count} times`;
    console.log("Count: " + count);
    setCount(1);
  }, [count]);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flex="1"
          justifyContent="space-around"
          style={{ height: "100vh" }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Grid item>
              <Typography variant="h1">URL Shortener</Typography>
            </Grid>
            <Grid>
              <TypistLoop first={url} second={url + shortSuffix} />
            </Grid>
            <Grid item>
              <Typography variant="h3">Want this for your URL?</Typography>
              <Typography variant="h3">Look enticing? This could be yours!</Typography>
              <Typography variant="h3">Less is more.</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-full-width"
                label="Enter the URL to be shortened:"
                style={{ margin: 8 }}
                placeholder="www.abc.com"
                helperText={url === "" && "Please enter an URL!"}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={url}
                onChange={handleChange}
                error={url === ""}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit}>
                Generate
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default App;

import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import React from "react";
import TypistLoop from "../components/TypistLoop";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
}));

export const Main = () => {
  const classes = useStyles();

  const [url, setUrl] = React.useState("");
  const handleChange = (event) => {
    setUrl(event.target.value);
    console.log(url);
  };

  const handleSubmit = () => {
    if (url.length === 0) {
      setHelperText("Please enter a URL");
      setIsValid(false);
      return;
    }
    alert(`${url} submitted!`);
  };

  const [helperText, setHelperText] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

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
            justifyContent="center"
            spacing={5}
          >
            <Grid item>
              <Typography variant="h1" align="center">
                {" "}
                URL Shortener
              </Typography>
            </Grid>
            <Grid>
              <TypistLoop />
            </Grid>
            <Grid item>
              <Typography variant="h2" align="center">
                Less is more.
              </Typography>
              {/* <Typography variant="h3" align="center">Enter your URL to get started:</Typography> */}
            </Grid>
            <Grid item style={{ width: "50%" }}>
              <Typography variant="h5" align="center">
                Enter your URL to get started!
              </Typography>
              <TextField
                id="standard-full-width"
                // label={
                //   <Typography variant="h7">
                //     Enter your URL to get Started:
                //   </Typography>
                // }
                label="URL"
                style={{ margin: 8, height: "50%" }}
                placeholder="www."
                helperText={!isValid && helperText}
                fullWidth
                // margin="normal"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                value={url}
                onChange={handleChange}
                error={!isValid}
                variant="outlined"
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
};

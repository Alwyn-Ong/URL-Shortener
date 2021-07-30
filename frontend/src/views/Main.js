import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
} from "@material-ui/core";
import React from "react";
import TypistLoop from "../components/TypistLoop";
import { makeStyles } from "@material-ui/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import toast from "react-hot-toast";

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

  const [responseUrl, setResponseUrl] = React.useState("");

  //TODO: Url validation
  const handleSubmit = () => {
    if (url.length === 0) {
      setHelperText("Please enter a URL");
      setIsValid(false);
      toast.error("Please enter a valid URL!");
      return;
    }
    setHelperText("");
    setIsValid(true);
    toast.promise(
      new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          original: url,
        });

        console.log(url);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:8080/", requestOptions)
          .then((response) => {
            if (response.ok) {
              return response.text();
            }
            
            let errorMessage = "Error!";
            if (response.status.toString()[0] == 4) {
              errorMessage = "Invalid URL!"
            }
            if (response.status.toString()[0] == 5) {
              errorMessage = "Error retrieving from server!";
            }
            throw new Error(errorMessage);
          })
          .then((result) => {
            console.log(result);
            setResponseUrl(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error.message);
            reject(error.message);
          });
      }),
      {
        loading: "Getting url...",
        success: "URL retrieved!",
        error: (err) => err,
      }
    );
  };

  console.log(responseUrl);

  const [helperText, setHelperText] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  const handleCopy = () => {
    var textField = document.createElement("textarea");
    textField.innerText = responseUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("URL copied to clipboard!");
  };

  const handleRedirect = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_NAME}/${responseUrl}`;
  }

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
            {responseUrl && (
              <Grid item>
                <Paper style={{ padding: "0.5rem", paddingLeft: "0.6rem" }}>
                  {/* Response{" "} */}
                  {/* {responseUrl + " "} */}
                  {`http://${process.env.REACT_APP_SERVER_NAME}/${responseUrl} `}
                  {document.queryCommandSupported("copy") && (
                    <IconButton onClick={handleCopy}>
                      <FileCopyIcon />
                    </IconButton>
                  )}
                    <IconButton onClick={handleRedirect}>
                      <NavigateNextIcon/>
                    </IconButton>

                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

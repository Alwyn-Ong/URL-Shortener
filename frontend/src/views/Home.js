import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import toast from "react-hot-toast";
import TypistLoop from "../components/TypistLoop";
import Main from "../layouts/Main";
import validator from "validator";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
}));

let protocolAndHost = window.location.protocol + "//" + window.location.hostname

const Home = () => {
  const classes = useStyles();

  const [url, setUrl] = React.useState("");
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const [responseUrl, setResponseUrl] = React.useState("");

  const handleSubmit = () => {
    // Validation for url
    if (url.length === 0 || !validator.isURL(url)) {
      setHelperText("Please enter a URL");
      setIsValid(false);
      toast.error("Please enter a valid URL!");
      return;
    }

    // Validation for custom url
    if (isCustomUrl) {
      if (customUrl.length == 0) {
        setCustomUrlHelperText("Please enter a custom URL ending");
        setIsCustomUrlValid(false);
        toast.error("Please enter a custom URL ending!");
        return;
      }

      if (customUrl.length > 8) {
        setCustomUrlHelperText("Custom URL should be 8 or less characters.");
        setIsCustomUrlValid(false);
        toast.error("Custom URL too long!");
        return;
      }

      if (!customUrl.match(/^[0-9a-zA-Z]+$/)) {
        console.log(customUrl + " is invalid apparently");
        setCustomUrlHelperText(
          "Custom URL should only contain numbers or letters."
        );
        setIsCustomUrlValid(false);
        toast.error("Custom URL is invalid!");
        return;
      }
    }

    // Reset field validations
    setHelperText("");
    setIsValid(true);
    setCustomUrlHelperText("");
    setIsCustomUrlValid(true);

    toast.promise(
      new Promise((resolve, reject) => {

        // Query from backend
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          original: url,
          shortened: isCustomUrl && customUrl ? customUrl : null,
        });

        console.log(url);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${protocolAndHost}:8080/`, requestOptions)
          .then((response) => {
            if (response.ok) {
              return response.text();
            }

            let errorMessage = "Error!";
            if (response.status.toString()[0] == 4) {
              errorMessage = "Invalid URL!";
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

  const [helperText, setHelperText] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);

  // For copyiug to clipboard
  const handleCopy = () => {
    var textField = document.createElement("textarea");
    textField.innerText = `${protocolAndHost}:${window.location.port}/${responseUrl}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("URL copied to clipboard!");
  };

  const handleRedirect = () => {
    window.location.href = `${protocolAndHost}:${window.location.port}/${responseUrl}`;
  };

  // For custom input
  const [isCustomUrl, setIsCustomUrl] = React.useState(false);
  const handleIsCustomUrlChange = (e) => {
    setIsCustomUrl(e.target.checked);
  };

  const [customUrl, setCustomUrl] = React.useState("");
  const handleCustomUrlChange = (e) => {
    setCustomUrl(e.target.value);
  };

  const customUrlToDisplay = () => {
    if (customUrl.length == 0) {
      return "";
    }

    if (customUrl.length <= 6) {
      return customUrl;
    }

    return customUrl.slice(0, 6) + "...";
  };

  const [isCustomUrlValid, setIsCustomUrlValid] = React.useState(true);
  const [customUrlHelperText, setCustomUrlHelperText] = React.useState("");

  return (
    <Main>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
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
        </Grid>
        <Grid item style={{ width: "50%" }}>
          <Typography variant="h5" align="center">
            Enter your URL to get started!
          </Typography>
          <TextField
            id="standard-full-width"
            label="URL"
            style={{ margin: 8, height: "50%" }}
            placeholder="http://"
            helperText="e.g. http://www.google.com"
            fullWidth
            value={url}
            onChange={handleChange}
            error={!isValid}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCustomUrl}
                onChange={handleIsCustomUrlChange}
                color="primary"
              />
            }
            label="Custom URL ending"
          ></FormControlLabel>
        </Grid>
        {isCustomUrl && (
          <Grid item style={{ width: "50%" }}>
            <Typography variant="h6" align="center">
              {`${protocolAndHost}:${window.location.port}/${customUrlToDisplay()}`}
            </Typography>

            <TextField
              id="customUrl"
              label="Custom"
              style={{ margin: 8, marginTop: 10 }}
              placeholder="custom"
              helperText={!isCustomUrlValid && customUrlHelperText}
              fullWidth
              value={customUrl}
              onChange={handleCustomUrlChange}
              error={!isCustomUrlValid}
              variant="outlined"
            />
          </Grid>
        )}
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            Generate
          </Button>
        </Grid>
        {responseUrl && (
          <Grid item>
            <Paper style={{ padding: "0.5rem", paddingLeft: "0.6rem" }}>
              {`${protocolAndHost + ":" + window.location.port}/${responseUrl} `}
              {document.queryCommandSupported("copy") && (
                <IconButton onClick={handleCopy}>
                  <FileCopyIcon />
                </IconButton>
              )}
              <IconButton onClick={handleRedirect}>
                <NavigateNextIcon />
              </IconButton>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Main>
  );
};

export default Home;

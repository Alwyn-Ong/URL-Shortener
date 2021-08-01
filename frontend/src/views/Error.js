import { Button, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import Main from "../layouts/Main";

const Error = () => {
  return (
    <Main>
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
        <Grid item>
          <Typography align="center" variant="h4">
            Oops, there was an error finding the URL to redirect to.
          </Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h5">
            Change your URL
          </Typography>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography align="center" variant="h6">
            -- OR --
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h5">
            Check out our main page to create your own short url!
          </Typography>
        </Grid>
        <Grid>
          <Button to={"/"} component={NavLink} variant="contained">Home</Button>
        </Grid>
      </Grid>
    </Main>
  );
};

export default Error;

import {
    Box, Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
}));

const Main = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flex="1"
          justifyContent="space-around"
          style={{ marginTop: 20 }}
        >
          {children}
        </Box>
      </Container>
      <Outlet />
    </div>
  );
};

export default Main;

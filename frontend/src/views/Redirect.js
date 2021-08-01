import React from "react";
import Error from "./Error";
import { useParams } from "react-router";

const Redirect = () => {
  let url = useParams().url;

  console.log(url);

  const [isError, setIsError] = React.useState(false);

  // Query backend
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    mode: "cors",
  };

  fetch(`${window.location.protocol + "//" + window.location.hostname + ":8080"}/${url}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }

      throw new Error("Invalid URL!");
    })
    .then((result) => {
      console.log(result);
      window.location.href = result;
    })
    .catch((error) => {
      console.log("error", error);
      setIsError(true);
    });

  return <div>{isError && <Error />}</div>;
};

export default Redirect;

import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./styles.css";

export default function TypistLoop(first, second) {
  const [count, setCount] = useState(1);

  console.log(count);
  useEffect(() => {
    setCount(1);
    // setCount(1);
  }, [count]);

  let original = "https://developer.gov.sg/";
  let shortened = `http://${process.env.REACT_APP_SERVER_NAME}/a1b2c3d4`
  console.log(process.env.REACT_APP_SERVER_NAME);

  return (
    <div className="animated-text">
      {count ? (
        <Typist
          startDelay={1000}
          delay={1000}
          onTypingDone={() => setTimeout(() => setCount(0), 2000)}
        >
          <span>{original}</span>
          <Typist.Backspace count={original.length} delay={2000} />
          <span>{shortened}</span>
        </Typist>
      ) : (
        <span>
          <br />
        </span>
      )}
    </div>
  );
}

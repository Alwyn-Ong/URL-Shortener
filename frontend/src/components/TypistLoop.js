import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import "./styles.css";

export default function TypistLoop(first, second) {
  const [count, setCount] = useState(1);

  // To reset component
  useEffect(() => {
    setCount(1);
  }, [count]);

  let original = "https://developer.gov.sg/";
  let shortened = `${window.location.protocol + "//" + window.location.hostname}/a1b2c3d4`

  return (
    <div className="animated-text">
      {count ? (
        <Typist
          delay={1000}
          onTypingDone={() => setTimeout(() => setCount(0), 2000)}
        >
          <span>{original}</span>
          <Typist.Backspace count={original.length} delay={2000} />
          <span>{shortened}</span>
        </Typist>
      ) : (
        // To act as a placeholder empty line
        <span>
          <br />
        </span>
      )}
    </div>
  );
}

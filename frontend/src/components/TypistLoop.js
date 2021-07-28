import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Typist from "react-typist";

export default function TypistLoop(first, second) {
  const [count, setCount] = useState(1);

  console.log(count);
  useEffect(() => {
    setCount(1)
    // setCount(1);
  }, [count]);

  return (
    <div>
      {count ? (
        <Typist startDelay={1000} delay={1000} onTypingDone={() => setTimeout(() => setCount(0), 2000)}>
          <span> www.abc.com/defghijklmno/pqrs</span>
          <Typist.Backspace count={"defghijklmno/pqrs".length} delay={800} />
          <span>abc123</span>
        </Typist>
      ) : (
        <span><br/></span>
      )}
    </div>
  );
}
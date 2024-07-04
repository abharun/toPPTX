import React, { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("Hello, World");
  const [element, setElement] = useState<JSX.Element>();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnClick = () => {
    setElement(createElement(text));
  };

  const createElement = (htmlString: string) => {
    return (
      <div
        className="ElementContent"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div>{htmlString}</div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50%", height: "100%", padding: "15px" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            className="TextArea"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <textarea
              id="txtbox"
              name="txtbox"
              cols={50}
              rows={30}
              onChange={handleChange}
            ></textarea>
          </div>
          <div
            className="ButtonArea"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <input
              type="button"
              onClick={handleOnClick}
              value={"Display Element"}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "50%", height: "100%" }}>
        {element}
      </div>
    </div>
  );
}

export default App;

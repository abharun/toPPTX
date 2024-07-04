import { ChangeEvent, useState } from "react";
import PptxGenJS from "pptxgenjs";
import parse from "html-react-parser";
import "./App.css";

const DEFAULT_FONT_FAMILY = "DM Sans Bold";
const DEFAULT_FONT_SIZE_TITLE = 30;
const DEFAULT_FONT_SIZE_TOPIC = 14;
const DEFAULT_FONT_SIZE_SUBTOPIC = 24;
const DEFAULT_FONT_SIZE_CONTENT = 16;

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
    const parsedLines = parseHtml(htmlString);
    generatePptx(parsedLines);

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
        {parse(htmlString)}
      </div>
    );
  };

  const parseHtml = (html: string) => {
    // Extracting text with simple parsing logic
    const div = document.createElement("div");
    div.innerHTML = html;

    const parsedLines: { text: string; color: string; fontSize: number }[] = [];

    div.querySelectorAll("span").forEach((span) => {
      const style = span.getAttribute("style");
      const text = span.innerText;

      let color = "000000"; // Default color
      let fontSize = 18; // Default font size

      if (style) {
        const colorMatch = style.match(/color:\s*([^;]+)/);
        const fontSizeMatch = style.match(/font-size:\s*([^;]+)/);

        if (colorMatch) {
          color = colorMatch[1]
            .replace("rgb(", "")
            .replace(")", "")
            .split(",")
            .map((x) => parseInt(x).toString(16).padStart(2, "0"))
            .join("");
        }

        if (fontSizeMatch) {
          fontSize = parseInt(fontSizeMatch[1].replace("pt", ""), 10);
        }
      }

      parsedLines.push({ text, color, fontSize });
    });

    return parsedLines;
  };

  const generatePptx = (
    parsedLines: { text: string; color: string; fontSize: number }[]
  ) => {
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();

    const textElements = parsedLines.map((line) => ({
      text: line.text,
      options: { fontSize: line.fontSize, color: line.color },
    }));

    slide.addText(textElements, {
      x: 1,
      y: 1,
      w: "80%",
      h: "90%",
      valign: "top",
      align: "left",
    });

    pptx.writeFile({ fileName: "presentation.pptx" });
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

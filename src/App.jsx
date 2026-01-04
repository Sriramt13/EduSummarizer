import { useState } from "react";
import Upload from "./components/Upload";
import SummaryResult from "./components/SummaryResult";
import { generateSummary } from "./utils/summarizer";
import { themes } from "./theme";

function App() {
  const [result, setResult] = useState(null);
  const [activeTheme, setActiveTheme] = useState("blue");

  const handleSummarize = (text, mode) => {
    setResult(generateSummary(text, mode));
  };

  const applyTheme = (name) => {
    const t = themes[name];
    document.documentElement.style.setProperty("--primary-accent", t.primary);
    document.documentElement.style.setProperty("--secondary-accent", t.secondary);
    document.documentElement.style.setProperty("--app-background", t.background);
    setActiveTheme(name);
  };

  return (
    <div className="container">
      <h1>EduSummarizer</h1>

      <div className="theme-bar">
        <div
          className={`theme-dot ${activeTheme === "blue" ? "active" : ""}`}
          style={{ background: themes.blue.primary }}
          onClick={() => applyTheme("blue")}
        />
        <div
          className={`theme-dot ${activeTheme === "purple" ? "active" : ""}`}
          style={{ background: themes.purple.primary }}
          onClick={() => applyTheme("purple")}
        />
        <div
          className={`theme-dot ${activeTheme === "emerald" ? "active" : ""}`}
          style={{ background: themes.emerald.primary }}
          onClick={() => applyTheme("emerald")}
        />
      </div>

      <div className="actions">
        <button
          onClick={() => {
            document.body.dataset.theme =
              document.body.dataset.theme === "light" ? "dark" : "light";
          }}
        >
          Toggle Light / Dark
        </button>

        <button
          className="secondary"
          onClick={() => document.body.classList.toggle("motion")}
        >
          Toggle Motion
        </button>
      </div>

      <div className="card">
        <Upload onTextReady={handleSummarize} />
      </div>

      <div className="card">
        <SummaryResult result={result} />
      </div>
    </div>
  );
}

export default App;

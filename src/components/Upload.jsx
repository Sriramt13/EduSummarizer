import { useState } from "react";
import { extractFromFile } from "../utils/fileReader";

export default function Upload({ onTextReady }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("normal");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const extracted = await extractFromFile(file);
      setText(extracted);
      alert("File imported successfully");
    } catch (err) {
      console.error(err);
      alert("Unsupported or unreadable file");
    }
    setLoading(false);
  };

  const handleSummarize = () => {
    setLoading(true);
    onTextReady(text, mode);
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <div>
      <textarea
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text or upload a file…"
      />

      <div className="actions">
        <button onClick={handleSummarize}>
          {loading ? "Processing…" : "Generate Summary"}
          {loading && <span className="loading-dot" />}
        </button>

        <button
          className="secondary"
          onClick={() =>
            setMode(mode === "normal" ? "keypoints" : "normal")
          }
        >
          {mode === "normal" ? "Key-Points Mode" : "Sentence Mode"}
        </button>

        {/* ✔ Multi-format uploader */}
        <label
          style={{
            cursor: "pointer",
            padding: "9px 16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,.25)",
            background: "var(--secondary-accent)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Upload File
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
}

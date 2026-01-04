import { exportAsPDF,exportAsDoc } from "../utils/exporter";

export default function SummaryResult({ result }) {
  if(!result || !result.summary)
    return <p style={{opacity:.6}}>No summary generated yet.</p>;

  const {summary,stats}=result;

  const copyToClipboard=()=>{
    navigator.clipboard.writeText(summary);
    alert("Copied to clipboard");
  };

  const downloadText=()=>{
    const blob=new Blob([summary],{type:"text/plain"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="summary.txt";a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3>Generated Summary</h3>
      <div className="summary-box">{summary}</div>

      <div className="actions">
        <button onClick={copyToClipboard}>Copy</button>
        <button className="secondary" onClick={downloadText}>TXT</button>
        <button onClick={()=>exportAsPDF(summary)}>PDF</button>
        <button className="secondary" onClick={()=>exportAsDoc(summary)}>DOCX</button>
      </div>

      <div className="card" style={{marginTop:14}}>
        <h4>Summary Insights</h4>
        <p>📌 Original words: <b>{stats.originalWords}</b></p>
        <p>📝 Summary words: <b>{stats.summaryWords}</b></p>
        <p>⚡ Compression: <b>{stats.compression}%</b></p>
        <p>⏳ Reading time saved: <b>{stats.readingTimeSaved} min</b></p>
      </div>
    </div>
  );
}

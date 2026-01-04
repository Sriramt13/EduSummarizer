function wordCount(t){return t.trim().split(/\s+/).length;}
function normalize(t){return t.replace(/\s+/g," ").trim();}

function rankSentences(text){
  const sentences=text.split(/(?<=[.!?])\s+/);
  const keywords=["important","key","main","impact","problem",
  "solution","benefit","result","purpose","summary","study"];
  return sentences.map(s=>{
    const score=keywords.reduce((a,k)=>a+(s.toLowerCase().includes(k)?2:0),0)
      + Math.min(s.length/40,2);
    return {sentence:s.trim(),score};
  }).sort((a,b)=>b.score-a.score);
}

export function summarizeSentences(text){
  text=normalize(text);
  const ranked=rankSentences(text);
  return ranked.slice(0,3).map(r=>r.sentence).join(" ");
}

export function summarizeKeypoints(text){
  text=normalize(text);
  return text.split(/[\.\n]/)
    .map(l=>l.trim()).filter(l=>l.length>6).slice(0,6)
    .map(l=>"• "+l).join("\n");
}

export function generateSummary(text,mode="normal"){
  const originalWords=wordCount(text);
  const summary=mode==="keypoints"?summarizeKeypoints(text):summarizeSentences(text);
  const summaryWords=wordCount(summary);
  const compression=Math.max(0,Math.round(((originalWords-summaryWords)/originalWords)*100));
  const readingTimeSaved=Math.max(0,Math.round((originalWords-summaryWords)/200));
  return{summary,stats:{originalWords,summaryWords,compression,readingTimeSaved}};
}

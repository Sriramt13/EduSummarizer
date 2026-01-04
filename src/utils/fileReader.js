import { extractTextFromPDF } from "./pdfReader";
import mammoth from "mammoth";

export async function extractFromFile(file) {
  const ext = file.name.toLowerCase();

  if (ext.endsWith(".pdf")) {
    return await extractTextFromPDF(file);
  }

  if (ext.endsWith(".docx")) {
    const buf = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buf });
    return result.value.trim();
  }

  if (ext.endsWith(".txt")) {
    const text = await file.text();
    return text.trim();
  }

  throw new Error("Unsupported file format");
}

import { jsPDF } from "jspdf";
import { Document,Packer,Paragraph } from "docx";
import { saveAs } from "file-saver";

export function exportAsPDF(text){
  const pdf=new jsPDF({unit:"pt",format:"a4"});
  const lines=pdf.splitTextToSize(text,500);
  let y=40;
  lines.forEach(l=>{if(y>800){pdf.addPage();y=40;}pdf.text(l,40,y);y+=18;});
  pdf.save("summary.pdf");
}

export async function exportAsDoc(text){
  const doc=new Document({sections:[{children:[new Paragraph(text)]}]});
  const blob=await Packer.toBlob(doc);
  saveAs(blob,"summary.docx");
}

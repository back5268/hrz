import { uploadFileToFirebase } from '@lib/firebase';
const fs = require('fs');
const pdf = require('html-pdf');

export const convertHTMLToPDF = async (html) => {
  try {
    const pdfFilePath = await new Promise((resolve, reject) => {
      pdf.create(html, { format: 'A4', border: '12mm' }).toFile('./src/public/pdf/output.pdf', (err, res) => {
        if (err) return reject(err);
        resolve(res.filename);
      });
    });

    const pdfBuffer = await new Promise((resolve, reject) => {
      fs.readFile(pdfFilePath, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
    fs.unlinkSync(pdfFilePath);
    const uploadResult = await uploadFileToFirebase({ buffer: pdfBuffer, originalname: 'file.pdf' });
    return uploadResult;
  } catch (error) {
    throw error;
  }
};

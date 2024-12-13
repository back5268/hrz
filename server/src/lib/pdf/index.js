import { uploadFileToFirebase } from '@lib/firebase';
const pdf = require('html-pdf');

export const convertHTMLToPDF = async (html) => {
  try {
    const pdfBuffer = await new Promise((resolve, reject) => {
      pdf.create(html, { format: 'A4', border: '12mm' }).toBuffer((err, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
      });
    });

    // Gửi buffer sang Firebase
    const uploadedUrl = await uploadFileToFirebase({
      buffer: pdfBuffer,
      mimetype: 'application/pdf',
      originalname: 'output.pdf'
    });

    return uploadedUrl; // Trả về URL của file đã upload
  } catch (error) {
    console.error('Error in convertHTMLToPDF:', error);
    throw error;
  }
};

import {
  deleteSalary,
  detailSalary,
  downloadSalary,
  exportSalary,
  exportSummarySalary,
  getListSalary,
  previewSalary,
  updateStatusSalary
} from '@controller';
import express from 'express';

export const salaryRouter = express.Router();

salaryRouter.get('/getListSalary', getListSalary);
salaryRouter.get('/detailSalary', detailSalary);
salaryRouter.get('/previewSalary', previewSalary);
salaryRouter.delete('/deleteSalary', deleteSalary);
salaryRouter.put('/updateStatusSalary', updateStatusSalary);
salaryRouter.get('/download', downloadSalary);
salaryRouter.get('/exportSalary', exportSalary);
salaryRouter.get('/exportSummarySalary', exportSummarySalary);

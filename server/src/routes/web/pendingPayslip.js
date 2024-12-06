import { deleteSalary, deleteSalarys, detailSalary, downloadSalary, getListSalaryPending, previewSalary, updateStatusSalary } from '@controller';
import express from 'express';

export const pendingPayslipRouter = express.Router();

pendingPayslipRouter.get('/getListSalary', getListSalaryPending);
pendingPayslipRouter.get('/detailSalary', detailSalary);
pendingPayslipRouter.get('/previewSalary', previewSalary);
pendingPayslipRouter.get('/download', downloadSalary);
pendingPayslipRouter.delete('/deleteSalary', deleteSalary);
pendingPayslipRouter.delete('/deleteSalarys', deleteSalarys);
pendingPayslipRouter.put('/updateStatusSalary', updateStatusSalary);

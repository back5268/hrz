import { deleteSalary, detailSalary, getListSalaryPending, previewSalary, updateStatusSalary } from '@controller';
import express from 'express';

export const pendingPayslipRouter = express.Router();

pendingPayslipRouter.get('/getListSalary', getListSalaryPending);
pendingPayslipRouter.get('/detailSalary', detailSalary);
pendingPayslipRouter.get('/previewSalary', previewSalary);
pendingPayslipRouter.delete('/deleteSalary', deleteSalary);
pendingPayslipRouter.put('/updateStatusSalary', updateStatusSalary);

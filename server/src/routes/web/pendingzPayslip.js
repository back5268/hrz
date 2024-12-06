import { detailSalary, downloadSalary, getListSalaryPendingz, previewSalary, updateStatusSalary } from '@controller';
import express from 'express';

export const pendingzPayslipRouter = express.Router();

pendingzPayslipRouter.get('/getListSalary', getListSalaryPendingz);
pendingzPayslipRouter.get('/detailSalary', detailSalary);
pendingzPayslipRouter.get('/previewSalary', previewSalary);
pendingzPayslipRouter.get('/download', downloadSalary);
pendingzPayslipRouter.put('/updateStatusSalary', updateStatusSalary);

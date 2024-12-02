import { detailSalary, getListSalaryPendingz, previewSalary, updateStatusSalary } from '@controller';
import express from 'express';

export const pendingzPayslipRouter = express.Router();

pendingzPayslipRouter.get('/getListSalary', getListSalaryPendingz);
pendingzPayslipRouter.get('/detailSalary', detailSalary);
pendingzPayslipRouter.get('/previewSalary', previewSalary);
pendingzPayslipRouter.put('/updateStatusSalary', updateStatusSalary);

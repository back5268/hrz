import { deleteSalary, detailSalary, getListSalaryApproved, previewSalary, updateStatusSalary } from '@controller';
import express from 'express';

export const approvedPayslipRouter = express.Router();

approvedPayslipRouter.get('/getListSalary', getListSalaryApproved);
approvedPayslipRouter.get('/detailSalary', detailSalary);
approvedPayslipRouter.get('/previewSalary', previewSalary);
approvedPayslipRouter.delete('/deleteSalary', deleteSalary);
approvedPayslipRouter.put('/updateStatusSalary', updateStatusSalary);

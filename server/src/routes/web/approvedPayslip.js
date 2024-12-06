import { detailSalary, downloadSalary, getListSalaryApproved, previewSalary, updateStatusSalary } from '@controller';
import express from 'express';

export const approvedPayslipRouter = express.Router();

approvedPayslipRouter.get('/getListSalary', getListSalaryApproved);
approvedPayslipRouter.get('/detailSalary', detailSalary);
approvedPayslipRouter.get('/previewSalary', previewSalary);
approvedPayslipRouter.get('/download', downloadSalary);
approvedPayslipRouter.put('/updateStatusSalary', updateStatusSalary);
approvedPayslipRouter.get('/download', downloadSalary);

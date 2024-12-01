import { detailSalary, downloadSalary, getListSalaryApp, handleSalary, previewSalaryApp } from '@controller';
import express from 'express';

export const payrollRouter = express.Router();

payrollRouter.get('/getListSalary', getListSalaryApp);
payrollRouter.get('/detailSalary', detailSalary);
payrollRouter.get('/preview', previewSalaryApp);
payrollRouter.get('/download', downloadSalary);
payrollRouter.put('/handleSalary', handleSalary);

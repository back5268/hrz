import { downloadSalary, getListSalaryApp, previewSalary } from '@controller';
import express from 'express';

export const payrollRouter = express.Router();

payrollRouter.get('/getListSalary', getListSalaryApp);
payrollRouter.get('/preview', previewSalary);
payrollRouter.get('/download', downloadSalary);

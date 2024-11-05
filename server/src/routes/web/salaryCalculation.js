import { calculateSalary, getListSalaryLog, updateConfig } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const salaryCalculationRouter = express.Router();

salaryCalculationRouter.get('/getListSalaryLog', getListSalaryLog);
salaryCalculationRouter.post('/calculateSalary', calculateSalary);
salaryCalculationRouter.put('/updateConfig', upload.fields([{ name: 'files', maxCount: 5 }]), updateConfig);

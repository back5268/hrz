import { createEmployee, deleteEmployee, detailEmployee, getListEmployee, getListWorkHistory, resetPassword, updateEmployee } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const employeeRouter = express.Router();

employeeRouter.get('/getListEmployee', getListEmployee);
employeeRouter.get('/getListWorkHistory', getListWorkHistory);
employeeRouter.get('/detailEmployee', detailEmployee);
employeeRouter.delete('/deleteEmployee', deleteEmployee);
employeeRouter.put('/resetPassword', resetPassword);
employeeRouter.post(
  '/createEmployee',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cmtFiles', maxCount: 2 },
    { name: 'taxFiles', maxCount: 5 },
    { name: 'healthFiles', maxCount: 5 },
    { name: 'educationFiles', maxCount: 5 }
  ]),
  createEmployee
);
employeeRouter.put(
  '/updateEmployee',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cmtFiles', maxCount: 2 },
    { name: 'taxFiles', maxCount: 5 },
    { name: 'healthFiles', maxCount: 5 },
    { name: 'educationFiles', maxCount: 5 }
  ]),
  updateEmployee
);

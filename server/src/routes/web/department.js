import { createDepartment, deleteDepartment, detailDepartment, getListDepartment, updateDepartment } from '@controller';
import express from 'express';

export const departmentRouter = express.Router();

departmentRouter.get('/getListDepartment', getListDepartment);
departmentRouter.get('/detailDepartment', detailDepartment);
departmentRouter.delete('/deleteDepartment', deleteDepartment);
departmentRouter.post('/createDepartment', createDepartment);
departmentRouter.put('/updateDepartment', updateDepartment);

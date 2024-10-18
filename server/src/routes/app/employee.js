import { getListContractApp, getListEmployeeApp } from '@controller';
import express from 'express';

export const employeeRouter = express.Router();

employeeRouter.get('/getListEmployee', getListEmployeeApp);
employeeRouter.get('/getListContract', getListContractApp);

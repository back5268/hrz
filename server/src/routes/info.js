import express from 'express';
import { authMiddleware } from '@middleware';
import { getListAccountInfo, getListBankInfo, getListDepartmentInfo, getListJobPositionInfo, getListPositionInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)
infoRouter.get('/getListAccountInfo', getListAccountInfo);
infoRouter.get('/getListBankInfo', getListBankInfo);
infoRouter.get('/getListPositionInfo', getListPositionInfo);
infoRouter.get('/getListJobPositionInfo', getListJobPositionInfo);
infoRouter.get('/getListDepartmentInfo', getListDepartmentInfo);

import express from 'express';
import { authMiddleware } from '@middleware';
import { getListAccountInfo, getListBankInfo, getListDepartmentInfo, getListJobPositionInfo, getListPositionInfo, getListShiftInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)
infoRouter.get('/getListAccountInfo', getListAccountInfo);
infoRouter.get('/getListBankInfo', getListBankInfo);
infoRouter.get('/getListPositionInfo', getListPositionInfo);
infoRouter.get('/getListJobPositionInfo', getListJobPositionInfo);
infoRouter.get('/getListDepartmentInfo', getListDepartmentInfo);
infoRouter.get('/getListShiftInfo', getListShiftInfo);

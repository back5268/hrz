import { checkTimekeepingApp, getListSyntheticTimekeepingApp, getListTimekeepingApp, getListTimekeepingLogApp } from '@controller';
import express from 'express';

export const timekeepingRouter = express.Router();

timekeepingRouter.post('/checkTimekeeping', checkTimekeepingApp);
timekeepingRouter.get('/getListTimekeeping', getListTimekeepingApp);
timekeepingRouter.get('/getListTimekeepingLog', getListTimekeepingLogApp);
timekeepingRouter.get('/getListSyntheticTimekeeping', getListSyntheticTimekeepingApp);

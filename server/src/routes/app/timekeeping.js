import { checkTimekeepingApp, getListSyntheticTimekeepingApp, getListTimekeepingApp, getListTimekeepingLogApp } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const timekeepingRouter = express.Router();

timekeepingRouter.post('/checkTimekeeping', upload.single('file'), checkTimekeepingApp);
timekeepingRouter.get('/getListTimekeeping', getListTimekeepingApp);
timekeepingRouter.get('/getListTimekeepingLog', getListTimekeepingLogApp);
timekeepingRouter.get('/getListSyntheticTimekeeping', getListSyntheticTimekeepingApp);

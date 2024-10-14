import {
  exportSyntheticTimekeeping,
  exportTimekeeping,
  exportTimekeepingLog,
  getListSyntheticTimekeeping,
  getListTimekeeping,
  getListTimekeepingLog,
  importTimekeeping
} from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const timekeepingRouter = express.Router();

timekeepingRouter.get('/getListTimekeepingLog', getListTimekeepingLog);
timekeepingRouter.get('/getListTimekeeping', getListTimekeeping);
timekeepingRouter.get('/getListSyntheticTimekeeping', getListSyntheticTimekeeping);
timekeepingRouter.get('/exportTimekeepingLog', exportTimekeepingLog);
timekeepingRouter.get('/exportTimekeeping', exportTimekeeping);
timekeepingRouter.get('/exportSyntheticTimekeeping', exportSyntheticTimekeeping);
timekeepingRouter.put('/importTimekeeping', upload.single('file'), importTimekeeping);

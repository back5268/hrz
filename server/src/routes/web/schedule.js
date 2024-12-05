import { exportSchedule, getListSchedule } from '@controller';
import express from 'express';

export const scheduleRouter = express.Router();

scheduleRouter.get('/getListSchedule', getListSchedule);
scheduleRouter.get('/exportSchedule', exportSchedule);

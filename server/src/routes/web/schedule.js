import { getListSchedule } from '@controller';
import express from 'express';

export const scheduleRouter = express.Router();

scheduleRouter.get('/getListSchedule', getListSchedule);

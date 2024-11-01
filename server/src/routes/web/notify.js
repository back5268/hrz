import { getListNotify, readAllNotify, readNotify, viewAllNotify } from '@controller';
import express from 'express';

export const notifyRouter = express.Router();

notifyRouter.get('/getListNotify', getListNotify);
notifyRouter.put('/viewAllNotify', viewAllNotify);
notifyRouter.put('/readNotify', readNotify);
notifyRouter.put('/readAllNotify', readAllNotify);

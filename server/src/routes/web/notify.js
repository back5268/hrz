import { createNotify, deleteNotify, detailNotify, getListNotify, updateNotify } from '@controller';
import express from 'express';

export const notifyRouter = express.Router();

notifyRouter.get('/getListNotify', getListNotify);
notifyRouter.get('/detailNotify', detailNotify);
notifyRouter.delete('/deleteNotify', deleteNotify);
notifyRouter.post('/createNotify', createNotify);
notifyRouter.put('/updateNotify', updateNotify);

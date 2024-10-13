import { createShift, deleteShift, detailShift, getListShift, updateShift } from '@controller';
import express from 'express';

export const shiftRouter = express.Router();

shiftRouter.get('/getListShift', getListShift);
shiftRouter.get('/detailShift', detailShift);
shiftRouter.delete('/deleteShift', deleteShift);
shiftRouter.post('/createShift', createShift);
shiftRouter.put('/updateShift', updateShift);

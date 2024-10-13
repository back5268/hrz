import { createDevice, deleteDevice, detailDevice, getListDevice, updateDevice } from '@controller';
import express from 'express';

export const deviceRouter = express.Router();

deviceRouter.get('/getListDevice', getListDevice);
deviceRouter.get('/detailDevice', detailDevice);
deviceRouter.delete('/deleteDevice', deleteDevice);
deviceRouter.post('/createDevice', createDevice);
deviceRouter.put('/updateDevice', updateDevice);

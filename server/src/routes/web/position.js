import { createPosition, deletePosition, detailPosition, getListPosition, updatePosition } from '@controller';
import express from 'express';

export const positionRouter = express.Router();

positionRouter.get('/getListPosition', getListPosition);
positionRouter.get('/detailPosition', detailPosition);
positionRouter.delete('/deletePosition', deletePosition);
positionRouter.post('/createPosition', createPosition);
positionRouter.put('/updatePosition', updatePosition);

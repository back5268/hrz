import { createJobPosition, deleteJobPosition, detailJobPosition, getListJobPosition, updateJobPosition } from '@controller';
import express from 'express';

export const jobPositionRouter = express.Router();

jobPositionRouter.get('/getListJobPosition', getListJobPosition);
jobPositionRouter.get('/detailJobPosition', detailJobPosition);
jobPositionRouter.delete('/deleteJobPosition', deleteJobPosition);
jobPositionRouter.post('/createJobPosition', createJobPosition);
jobPositionRouter.put('/updateJobPosition', updateJobPosition);

import express from 'express';
import { authMiddleware } from '@middleware';
import { departmentRouter } from './department';
import { jobPositionRouter } from './jobPosition';
import { positionRouter } from './position';
import { personnelRouter } from './personnel';
import { contractRouter } from './contract';
import { templateRouter } from './template';

export const webRouter = express.Router();

webRouter.use(authMiddleware);
webRouter.use('/department', departmentRouter);
webRouter.use('/job-position', jobPositionRouter);
webRouter.use('/personnel', personnelRouter);
webRouter.use('/position', positionRouter);
webRouter.use('/contract', contractRouter);
webRouter.use('/template', templateRouter);
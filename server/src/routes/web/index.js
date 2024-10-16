import express from 'express';
import { authMiddleware, permissionMiddleware } from '@middleware';
import { departmentRouter } from './department';
import { jobPositionRouter } from './jobPosition';
import { positionRouter } from './position';
import { employeeRouter } from './employee';
import { contractRouter } from './contract';
import { templateRouter } from './template';
import { permissionRouter } from './permission';
import { logRouter } from './log';
import { newRouter } from './new';
import { shiftRouter } from './shift';
import { deviceRouter } from './device';
import { scheduleRouter } from './schedule';
import { timekeepingRouter } from './timekeeping';

export const webRouter = express.Router();

webRouter.use(authMiddleware, permissionMiddleware);
webRouter.use('/department', departmentRouter);
webRouter.use('/job-position', jobPositionRouter);
webRouter.use('/log', logRouter);
webRouter.use('/new', newRouter);
webRouter.use('/permission', permissionRouter);
webRouter.use('/employee', employeeRouter);
webRouter.use('/position', positionRouter);
webRouter.use('/contract', contractRouter);
webRouter.use('/template', templateRouter);
webRouter.use('/schedule', scheduleRouter);
webRouter.use('/shift', shiftRouter);
webRouter.use('/device', deviceRouter);
webRouter.use('/timekeeping', timekeepingRouter);

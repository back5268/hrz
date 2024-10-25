import express from 'express';
import { authMiddleware } from '@middleware';
import { timekeepingRouter } from './timekeeping';
import { shiftRouter } from './shift';
import { employeeRouter } from './employee';
import { newRouter } from './new';
import { applicationRouter } from './application';

export const appRouter = express.Router();

appRouter.use(authMiddleware);
appRouter.use('/shift', shiftRouter);
appRouter.use('/timekeeping', timekeepingRouter);
appRouter.use('/employee', employeeRouter);
appRouter.use('/new', newRouter);
appRouter.use('/application', applicationRouter);

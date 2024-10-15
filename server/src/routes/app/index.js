import express from 'express';
import { authMiddleware } from '@middleware';
import { timekeepingRouter } from './timekeeping';
import { shiftRouter } from './shift';

export const appRouter = express.Router();

appRouter.use(authMiddleware);
appRouter.use('/shift', shiftRouter);
appRouter.use('/timekeeping', timekeepingRouter);

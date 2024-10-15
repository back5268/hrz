import { getListShiftApp } from '@controller';
import express from 'express';

export const shiftRouter = express.Router();

shiftRouter.get('/getListShift', getListShiftApp);

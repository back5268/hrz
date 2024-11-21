import { getListAppprove } from '@controller';
import express from 'express';

export const approveRouter = express.Router();

approveRouter.get('/getListAppprove', getListAppprove);

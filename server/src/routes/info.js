import express from 'express';
import { authMiddleware } from '@middleware';
import { getListAccountInfo } from '@controller';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)
infoRouter.get('/getListAccountInfo', getListAccountInfo);

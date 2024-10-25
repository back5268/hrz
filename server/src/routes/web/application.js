import { detailApplication, getListApplication, updateApplication } from '@controller';
import express from 'express';

export const applicationRouter = express.Router();

applicationRouter.get('/getListApplication', getListApplication);
applicationRouter.get('/detailApplication', detailApplication);
applicationRouter.put('/updateApplication', updateApplication);

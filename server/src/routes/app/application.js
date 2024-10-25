import { cancelApplication, createApplication, getListApplicationApp } from '@controller';
import express from 'express';

export const applicationRouter = express.Router();

applicationRouter.get('/getListApplication', getListApplicationApp);
applicationRouter.post('/createApplication', createApplication);
applicationRouter.delete('/cancelApplication', cancelApplication);

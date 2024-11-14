import { detailNew, getListNewApp } from '@controller';
import express from 'express';

export const newRouter = express.Router();

newRouter.get('/getListNew', getListNewApp);
newRouter.get('/detailNew', detailNew);

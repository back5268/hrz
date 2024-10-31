import { cancelApplication, createApplication, detailApplicationApp, getListApplicationApp } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const applicationRouter = express.Router();

applicationRouter.get('/getListApplication', getListApplicationApp);
applicationRouter.get('/detailApplication', detailApplicationApp);
applicationRouter.post('/createApplication', upload.fields([{ name: 'files', maxCount: 5 }]), createApplication);
applicationRouter.delete('/cancelApplication', cancelApplication);

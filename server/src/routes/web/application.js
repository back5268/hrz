import { createApplicationAdmin, detailApplication, getListApplication, updateApplication } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const applicationRouter = express.Router();

applicationRouter.get('/getListApplication', getListApplication);
applicationRouter.get('/detailApplication', detailApplication);
applicationRouter.put('/updateApplication', updateApplication);
applicationRouter.post('/createApplication', upload.fields([{ name: 'files', maxCount: 5 }]), createApplicationAdmin);

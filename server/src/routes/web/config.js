import { getConfig, updateConfig } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const configRouter = express.Router();

configRouter.get('/getConfig', getConfig);
configRouter.put('/updateConfig', upload.fields([{ name: 'files', maxCount: 5 }]), updateConfig);

import { getConfig, updateConfig } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const timekeepingConfigRouter = express.Router();

timekeepingConfigRouter.get('/getConfig', getConfig);
timekeepingConfigRouter.put('/updateConfig', upload.fields([{ name: 'files', maxCount: 5 }]), updateConfig);

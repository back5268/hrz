import { getListImportLog } from '@controller';
import express from 'express';

export const importLogRouter = express.Router();

importLogRouter.get('/getListImportLog', getListImportLog);

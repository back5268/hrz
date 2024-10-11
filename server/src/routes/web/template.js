import { getListTemplate, updateTemplate } from '@controller';
import express from 'express';

export const templateRouter = express.Router();

templateRouter.get('/getListTemplate', getListTemplate);
templateRouter.put('/updateTemplate', updateTemplate);

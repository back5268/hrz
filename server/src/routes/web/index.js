import express from 'express';
import { authMiddleware } from '@middleware';

export const webRouter = express.Router();

webRouter.use(authMiddleware);

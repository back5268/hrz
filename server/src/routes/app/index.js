import express from 'express';
import { authMiddleware } from '@middleware';

export const appRouter = express.Router();

appRouter.use(authMiddleware);

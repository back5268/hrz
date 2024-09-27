import express from 'express';
import { authMiddleware } from '@middleware';

export const infoRouter = express.Router();

infoRouter.use(authMiddleware)

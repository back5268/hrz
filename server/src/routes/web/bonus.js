import { createBonus, deleteBonus, detailBonus, getListBonus, updateBonus } from '@controller';
import express from 'express';

export const bonusRouter = express.Router();

bonusRouter.get('/getListBonus', getListBonus);
bonusRouter.get('/detailBonus', detailBonus);
bonusRouter.delete('/deleteBonus', deleteBonus);
bonusRouter.post('/createBonus', createBonus);
bonusRouter.put('/updateBonus', updateBonus);

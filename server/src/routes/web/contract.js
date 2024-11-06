import { cancelContract, createContract, deleteContract, getListContract, previewContract, updateContract } from '@controller';
import express from 'express';

export const contractRouter = express.Router();

contractRouter.get('/getListContract', getListContract);
contractRouter.delete('/deleteContract', deleteContract);
contractRouter.post('/createContract', createContract);
contractRouter.put('/updateContract', updateContract);
contractRouter.put('/cancelContract', cancelContract);
contractRouter.get('/previewContract', previewContract);

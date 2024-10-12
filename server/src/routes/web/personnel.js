import { createPersonnel, deletePersonnel, detailPersonnel, getListPersonnel, getListWorkHistory, resetPassword, updatePersonnel } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const personnelRouter = express.Router();

personnelRouter.get('/getListPersonnel', getListPersonnel);
personnelRouter.get('/getListWorkHistory', getListWorkHistory);
personnelRouter.get('/detailPersonnel', detailPersonnel);
personnelRouter.delete('/deletePersonnel', deletePersonnel);
personnelRouter.put('/resetPassword', resetPassword);
personnelRouter.post(
  '/createPersonnel',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cmtFiles', maxCount: 2 },
    { name: 'taxFiles', maxCount: 5 },
    { name: 'healthFiles', maxCount: 5 },
    { name: 'educationFiles', maxCount: 5 }
  ]),
  createPersonnel
);
personnelRouter.put(
  '/updatePersonnel',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cmtFiles', maxCount: 2 },
    { name: 'taxFiles', maxCount: 5 },
    { name: 'healthFiles', maxCount: 5 },
    { name: 'educationFiles', maxCount: 5 }
  ]),
  updatePersonnel
);

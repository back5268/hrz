import { createNew, deleteNew, detailNew, getListNew, updateNew } from '@controller';
import { upload } from '@lib/multer';
import express from 'express';

export const newRouter = express.Router();

newRouter.get('/getListNew', getListNew);
newRouter.get('/detailNew', detailNew);
newRouter.delete('/deleteNew', deleteNew);
newRouter.post(
  '/createNew',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'files', maxCount: 5 }
  ]),
  createNew
);
newRouter.put(
  '/updateNew',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'files', maxCount: 5 }
  ]),
  updateNew
);

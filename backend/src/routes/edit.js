import { Router } from 'express';
import path from 'path';
import {
  renderController,
  uploadController,
  getByTemplateIdController,
} from '../controller/editController.js';
import fileUpload from '../utils/fileUpload.js';
import CheckAuth from '../middleware/auth-middleware.js';

const routes = Router();

routes.post('/render', CheckAuth, renderController);
routes.post(
  '/upload',
  CheckAuth,
  fileUpload.single('avatar'),
  uploadController
);

routes.get('/design/:id', getByTemplateIdController);

export default routes;

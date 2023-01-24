import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CreateTemaplate,
  GetTemaplate,
  UpdateTemaplate,
  DeleteTemaplate,
} from '../controller/templateController.js';

import { CheckAuth } from '../controller/authController.js';

const route = Router();
route.get('/read/:id', CheckAuth, GetTemaplate);
route.post('/create', CheckAuth, CreateTemaplate);
route.patch('/update/:id', CheckAuth, UpdateTemaplate);
route.delete('/delete/:id', CheckAuth, DeleteTemaplate);

export default route;

/* middleware issue */

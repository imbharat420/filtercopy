import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  LoginController,
  RegisterController,
  CheckAuth,
} from '../controller/authController.js';
const route = Router();

route.get('/check', CheckAuth);
route.post('/login', LoginController);
route.post('/register', RegisterController);

export default route;

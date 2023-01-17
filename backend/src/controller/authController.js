import asyncHandler from 'express-async-handler';
import User from '../models/user-model.js';
import { generate, verify } from '../utils/jwt-token.js';
import UserSettings from '../models/user-settings-model.js';
import { getFindUserQuery } from './utils.js';

export const LoginController = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne(getFindUserQuery(login));

  console.log(user, login, password);

  if (!user || !(await user.checkPassword(password))) {
    throw new ReqError(errorMessages.auth.failed);
  }

  res.ok({ user, token: generate(user._id) });
});

export const RegisterController = asyncHandler(async (req, res) => {
  const reqBody = req.getBody('name email avatar username password');
  const user = new User(reqBody);
  await user.validate();
  await user.save();
  // await file.updateFile(req, user);

  // await UserSettings.create({
  //   _id: user._id,
  // });

  res.ok({ user, token: generate(user._id) });
});

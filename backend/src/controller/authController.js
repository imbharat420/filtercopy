import asyncHandler from 'express-async-handler';
import User from '../models/user-model.js';
import { generate, verify, verifyUser } from '../utils/jwt-token.js';
import UserSettings from '../models/user-settings-model.js';
import { getFindUserQuery } from './utils.js';
import errorMessages from '../utils/error-messages.js';

export const CheckAuth = async (req, res, next) => {
  const user = await verifyUser(req.headers.authorization);
  res.ok({ user });
};

export const LoginController = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne(getFindUserQuery(login));

  if (!user || !(await user?.checkPassword(password))) {
    res.badRequest({ error: errorMessages.auth.failed[0] });
  }
  res.ok({ user, token: generate(user.id) });
});

export const RegisterController = asyncHandler(async (req, res) => {
  const reqBody = req.getBody('name email avatar username password');
  const user = new User(reqBody);
  await user.validate();
  await user.save();
  res.ok({ user, token: generate(user.id) });
});

/*


  await file.updateFile(req, user);

  await UserSettings.create({
    _id: user._id,
  });
*/

import asyncHandler from 'express-async-handler';
import User from '../models/user-model.js';
import { generate, verify, verifyUser } from '../utils/jwt-token.js';
import { getFindUserQuery } from './utils.js';
import errorMessages from '../utils/error-messages.js';

/**
 * @POST /api/auth/check
 * ?DESC LOAD USER GET TOKEN AND RETURN USER
 * !access  PUBLIC
 * TODO: MORE SECURITY CHECKS
 */
export const CheckAuth = async (req, res, next) => {
  console.log(req.headers.authorization);
  const user = await verifyUser(req.headers.authorization);
  res.ok({ user });
};

/**
 * @POST /api/auth/login
 * ?DESC GENERATE TOKEN ACCORDING TO USER ID
 * !access  PUBLIC
 * TODO: MORE SECURITY CHECKS
 */

export const LoginController = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne(getFindUserQuery(login));

  if (!user || !(await user?.checkPassword(password))) {
    res.badRequest({ error: errorMessages.auth.failed[0] });
  }
  res.ok({ user, token: generate(user.id) });
});

/**
 * @POST /api/auth/register
 * ?DESC GENERATE TOKEN BY SAVING USER ON DATABASE
 * !access  PUBLIC
 * TODO: MORE SECURITY CHECKS
 */

export const RegisterController = asyncHandler(async (req, res) => {
  const reqBody = req.getBody('name email avatar username password');
  const user = new User(reqBody);
  console.log(reqBody, user);
  // await user.validate();
  await user.save();
  res.ok({ user, token: generate(user.id) });
});

/*
  await file.updateFile(req, user);

  await UserSettings.create({
    _id: user._id,
  });
*/

import asyncHandler from 'express-async-handler';
import User from '../models/user-model.js';
import errorMessages from '../utils/error-messages.js';

export const checkAuth = async (req, res, next) => {
  const user = await jwtToken.verifyUser(req.headers.authorization);
  req.user = user;
  next();
};

export const checkPassAfterLoggedIn = async (req, res, next) => {
  const ok = await req.user.checkPassword(req.body.password);
  if (!ok) throw new ReqError(errorMessages.password.wrong, 400);
  next();
};

export const verifyEmailMail = () => {};
export const forgetPasswordMail = () => {};
export const verifyEmailOtp = () => {};
export const sendOtpMail = () => {};

export const registerController = asyncHandler(async (req, res) => {
  const reqBody = req.getBody('name email avatar username password');
  const user = new User(reqBody);

  await user.validate();
  await file.updateFile(req, user);

  await user.save();
  await UserSettings.create({
    _id: user._id,
  });

  req.user = user;
  next();
});

export const loginController = asyncHandler(async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne(getFindUserQuery(login));

  if (!user || !(await user.checkPassword(password))) {
    throw new ReqError(errorMessages.auth.failed);
  }

  req.user = user;
  next();
});

export const resetPassword = () => {};

export const sendJwt = (req, res) => {
  const token = jwtToken.generate(req.user._id);
  res.success({ token });
};

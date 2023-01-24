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

export const registerController = asyncHandler(async (req, res) => {});

export const loginController = asyncHandler(async (req, res) => {});

export const resetPassword = () => {};

export const sendJwt = (req, res) => {
  const token = jwtToken.generate(req.user._id);
  res.success({ token });
};

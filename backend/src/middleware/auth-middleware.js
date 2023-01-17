export const checkAuth = async (req, res, next) => {
  const user = await jwtToken.verifyUser(req.headers.authorization);
  req.user = user;
  next();
};

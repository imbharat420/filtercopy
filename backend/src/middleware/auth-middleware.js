import { verifyUser } from '../utils/jwt-token.js';

const CheckAuth = async (req, res, next) => {
  const user = await verifyUser(req.headers.authorization);
  // console.log(user, req.headers.authorization);
  req.user = user;
  next();
};

export default CheckAuth;

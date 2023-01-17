import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user-model.js';
import errorMessages from './error-messages.js';

export const generate = (id) =>
  jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d',
  });

export const verify = (token) => {
  const tokenInfo = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  const currentTime = Math.floor(Date.now() / 1000);
  if (tokenInfo.exp <= currentTime) {
    throw new ReqError(errorMessages.auth.jwtExpire);
  }
  return tokenInfo;
};

// export const decode = (token) => {
//   return jsonwebtoken.decode(token, {});
// };

export const verifyUser = async (rawToken) => {
  console.log(rawToken);
  if (rawToken?.startsWith('Bearer ')) {
    rawToken = rawToken.replace(/^Bearer /, ''); // Bearer with (space)
  } else {
    rawToken = 'none';
  }

  const token = verify(rawToken);
  const user = await User.findById(token.id);

  if (!user) {
    throw new ReqError(errorMessages.user.deleted);
  }
  if (user.passwordChangedAfter(token.iat)) {
    throw new ReqError(errorMessages.auth.jwtExpire);
  }

  return user;
};

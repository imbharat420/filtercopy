export const getFindUserQuery = (login) => {
  if (typeof login !== 'string') throw new ReqError('Login field is missing');
  return login.includes('@') ? { email: login } : { username: login };
};

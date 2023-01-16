const { OTP_CHARACTERS } = require('../config/config');

const otp = (n) => {
  let code = '';
  let i = 0;
  for (i; i < n; i++) {
    code += OTP_CHARACTERS[Math.floor(Math.random() * OTP_CHARACTERS.length)];
  }
  return code;
};

export default otp;

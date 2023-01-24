import brcypt from 'bcrypt';
import errorMessages from '../utils/error-messages';

const otpSchemaHelpers = (schema) => {
  schema.pre('save', async function (next) {
    if (!this.isModified('code')) return next();

    this.code = await brcypt.hash(
      this.code,
      +process.env.BCRYPT_SALT_ROUND_EXTRA
    );
    next();
  });
  schema.methods.checkCode = function (code) {
    if (typeof code !== 'string') throw new ReqError(errorMessages.otp.invalid);
    return brcypt.compare(code, this.code);
  };
};

export default otpSchemaHelpers;

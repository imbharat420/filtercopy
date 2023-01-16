import mongoose from 'mongoose';
import commonSchemaField from './common-schema-field-model.js';
// import VerifyEmail from './otp-verify-email-model.js';
import errorMessages from '../utils/error-messages.js';

// import { USER_SAFE_INFO } from '../config/config';
// import { getFeildsFromObject } from '../utils';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, errorMessages.name.fieldMissing[0]],
      match: [/^[a-zA-Z]{1,}(?: [a-zA-Z]+){0,2}$/, 'Enter a valid name.'],
    },
    username: {
      type: String,
      required: [true, errorMessages.username.fieldMissing[0]],
      unique: [true, errorMessages.username.duplicate[0]],
      lowercase: true,
      match: [/^[a-z0-9]+$/, 'Enter a valid username.'],
    },
    email: commonSchemaField.email,
    avatar: {
      type: String,
      match: [/^https?:\/\//, 'Please enter a valid image url'],
    },
    password: {
      type: String,
      required: [true, errorMessages.password.fieldMissing[0]],
      minLength: 6,
    },
    passwordModifiedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    +process.env.BCRYPT_SALT_ROUND
  );
  this.passwordModifiedAt = new Date.now();
  next();
});

// userSchema.post('save', async function () {
//   VerifyEmail.deleteOne({ email: this.email }).catch(() => {});
// });

userSchema.methods.checkPassword = function (password) {
  if (!password) {
    throw new ReqError(errorMessages.password.fieldMissing);
  }
  return bcrypt.compare(password, this.password);
};

// userSchema.methods.getSafeInfo = function () {
//   return getFeildsFromObject(this, USER_SAFE_INFO);
// };

userSchema.methods.passwordChangedAfter = function (queryTime) {
  if (this?.passwordModifiedAt) {
    const lastModified = Math.floor(this.passwordModifiedAt.getTime() / 1000);
    return lastModified > queryTime;
  }
  return false;
};

const User = ''; //mongoose.model('user', userSchema);

export default User;

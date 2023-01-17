import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import commonSchemaField from './common-schema-field-model.js';
import errorMessages from '../utils/error-messages.js';

// import VerifyEmail from './otp-verify-email-model.js';
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
    date_joined: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    timestamps: false,
  }
);

/*
    provider: { type: [String], enum: ['google', 'local'], required: false },
    googleId: { type: String },
*/

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.pre('save', function (next) {
  // if (!this.provider.includes('local')) next();
  // don't rehash the password everytime
  if (this.isModified('password') || this.isNew) {
    try {
      // Hash Password
      const salt = bcrypt.genSaltSync(10);
      this.password = bcrypt.hashSync(this.password, salt);
      this.passwordModifiedAt = Date.now();
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(
//     this.password,
//     +process.env.BCRYPT_SALT_ROUND
//   );
//   this.passwordModifiedAt = Date.now();
//   next();
// });

// userSchema.post('save', async function () {
//   VerifyEmail.deleteOne({ email: this.email }).catch(() => {});
// });

userSchema.methods.checkPassword = async function (password) {
  try {
    // Check/Compares password
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
    throw new ReqError(errorMessages.password.fieldMissing);
  }
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

// set TTL
// https://stackoverflow.com/a/35179159/10629172
userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * process.env.EXPIRATION_TIME,
    partialFilterExpression: {
      isVerified: false,
    },
  }
);

const User = mongoose.model('user', userSchema);

export default User;

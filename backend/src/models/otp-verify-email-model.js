import commonSchemaField from './common-schema-field-model.js';
import { VERIFY_EMAIL_EXPIRE_DURATION } from '../config/config.js';
import otpSchemaHelpers from './utils-otp.js';

const schema = mongoose.Schema(
  {
    email: commonSchemaField.email,
    code: {
      type: 'string',
      required: true,
    },
    expireAt: {
      required: true,
      type: Date,
      default: Date.now,
      expires: VERIFY_EMAIL_EXPIRE_DURATION,
      select: false,
    },
  },
  { versionKey: false }
);

otpSchemaHelpers(schema);
export default mongoose.model('otp-verify-email', schema);

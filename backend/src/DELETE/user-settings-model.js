import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const hueSchema = {
  type: Number,
  required: true,
  min: 0,
  max: 360,
};

const userSettingsSchema = mongoose.Schema(
  {
    theme: {
      type: String,
      lowercase: true,
      enum: ['dark', 'light'],
    },

    hue: {
      ...hueSchema,
      required: false,
    },

    collections: [
      {
        name: {
          type: String,
          required: true,
          match: [/^[a-zA-Z 0-9]+$/, 'Please insert a valid name'],
        },
        hue: hueSchema,
      },
    ],
  },
  { versionKey: false }
);

const UserSettings = mongoose.model('user-settings', userSettingsSchema);
export default UserSettings;

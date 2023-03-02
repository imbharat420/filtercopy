import mongoose from 'mongoose';

const TemplateSchema = mongoose.Schema(
  {
    //Array of all filtered images with filter ID
    images: {
      type: [
        {
          url: String,
          id: String,
          width: Number,
          height: Number,
        },
      ],
    },

    // !Curretly uploaded image
    currentImage: {
      type: {
        url: String,
        id: String,
        width: Number,
        height: Number,
      },
      required: true,
    },

    //!the Image we upload URL
    uploadedImage: {
      type: {
        url: String,
        id: String,
        width: Number,
        height: Number,
        expires_at: String,
      },
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true,
    },
    lastModifiedAt: {
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

TemplateSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.user;
    delete ret._id;
    delete ret.__v;
  },
});

const Template = mongoose.model('Template', TemplateSchema);

export default Template;

/*
{
    "id": "3ed6396414172807ca02d7f3167c0b3f",
    "url": "/photos/3ed6396414172807ca02d7f3167c0b3f.jpg",
    "url_secure": "/photos/3ed6396414172807ca02d7f3167c0b3f.jpg",
    "width": 900,
    "height": 900,
    "expires_at": "Sat, 21 Jan 2023 14:24:15 +0000"
}
*/

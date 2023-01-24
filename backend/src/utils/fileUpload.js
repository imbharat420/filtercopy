import { v4 as uuid } from 'uuid';
import multer from 'multer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

var config = multer.diskStorage({
  limits: 500000,
  inMemory: true,
  destination: function (req, file, cb) {
    const { id } = req.user;
    const location = path.join(__dirname, `../../public/uploads/images/${id}`);
    fs.mkdirSync(location, { recursive: true });
    cb(null, location);
  },
  filename: function (req, file, cb) {
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, uuid() + '.' + ext);
  },
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  },
});

// const storage = multer.memoryStorage();

var fileUpload = multer({ storage: config });

export default fileUpload;

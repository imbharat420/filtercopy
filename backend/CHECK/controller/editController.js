import axios from 'axios';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// import formidable from 'formidable';
import FormData from 'form-data';

const uploadController = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'file is required' });
  }
  const { headers, file } = req;
  const { buffer, originalname: filename } = file;

  headers['Content-Type'] = 'multipart/form-data';

  try {
    const formFile = new FormData();
    formFile.append('file', buffer, { filename });
    formFile.append('name', req.file.originalname);

    let { data } = await axios({
      method: 'POST',
      url: process.env.UPLOAD,
      data: formFile,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...formFile.getHeaders(),
      },
    });

    res.status(200).json({
      id: data.id,
      name: req.file.filename,
      ...data,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

const renderController = asyncHandler(async (req, res) => {
  const { photoId, effectId } = req.body;
  if (!photoId || !effectId) {
    return res.status(400).json({ message: 'photoId & effectId are required' });
  }

  const formData = new FormData();
  formData.append('photoId', photoId);
  formData.append('effectId', effectId); //"520fdb6592237be077cf99eb"
  console.log(photoId, effectId);
  try {
    let { data } = await axios({
      method: 'POST',
      url: process.env.RENDER,
      data: formData,
    });
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      erorr: 'BACKEND axios ' + err,
    });
  }
});

export { uploadController, renderController };

// const filePath = path.join(__dirname, '../uploads/' + req.file.filename);

// const formData = new FormData();
// formData.append('file', fs.createReadStream(filePath));

import axios from 'axios';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';

import request from 'request';

function convertImageToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    request.get(imageUrl, { encoding: null }, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(Buffer.from(body, 'binary').toString('base64'));
      }
    });
  });
}

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    console.log(data);
    res.ok({
      id: data.id,
      name: req.file.filename,
      ...data,
    });
  } catch (err) {
    res.BAD_REQUEST({
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
    return res.ok(data);
  } catch (err) {
    res.BAD_REQUEST({
      erorr: 'BACKEND axios ' + err,
    });
  }
});

export { uploadController, renderController };

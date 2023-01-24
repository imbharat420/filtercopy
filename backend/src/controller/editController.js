import axios from 'axios';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import fs from 'fs';
import FormData from 'form-data';

import download from '../utils/saveFile.js';

// ! MODEL
import Template from '../models/template-model.js';

/**
 * @POST /api/edit/upload
 * ?DESC UPLOADED IMAGE AND GET $ID AND SAVE TEMPLATE ON DATABASE
 * !access  PRIVATE
 * TODO: UPDATE I HAVE TO CHANGE ACCORDING TO PERMISSION
 */

export const uploadController = asyncHandler(async (req, res) => {
  const { file, user } = req;

  if (!file) {
    return res.status(400).json({ message: 'file is required' });
  }

  try {
    const formFile = new FormData();
    formFile.append('file', fs.createReadStream(file.path));
    formFile.append('name', file.originalname);
    let { data } = await axios({
      method: 'POST',
      url: process.env.UPLOAD,
      data: formFile,
      headers: {
        'Content-Type': 'multipart/form-data',
        // ...formFile.getHeaders(),
      },
    });

    let path = `${user.id}/${file.filename}`;
    const newTemplate = await new Template({
      currentImage: {
        url: path,
        id: data.id,
        width: data.width,
        height: data.height,
      },
      uploadedImage: {
        url: path,
        id: data.id,
        expires_at: data.expires_at,
      },
      user: user.id,
    }).save();

    // ! DATA
    res.ok(newTemplate);
  } catch (err) {
    res.badRequest({
      message: 'create issue ' + err.message,
    });
  }
});

/**
 * @GET /api/edit/get/:id
 * ?DESC get Image
 * !access  PUBLIC
 * TODO: don't have idea but some where permission issues need to be improve
 */

export const getByTemplateIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const newTemplate = await Template.findById(id);
    res.ok(newTemplate);
  } catch (err) {
    res.badRequest({
      message: 'create issue ' + err.message,
    });
  }
});

/**
 * @POST /api/edit/render/:id
 * ?DESC GIVE ID OF UPLOADED IMAGE ID WITH EFFECTID
 * !access  PUBLIC
 * TODO: UPDATE I HAVE TO CHANGE ACCORDING TO PERMISSION
 */

export const renderController = asyncHandler(async (req, res) => {
  const {
    file,
    user,
    body: { photoId, effectId, tid },
  } = req;
  console.log(photoId, effectId);
  if (!photoId || !effectId) {
    return res.status(400).json({ message: 'photoId & effectId are required' });
  }

  const formData = new FormData();
  formData.append('photoId', photoId);
  formData.append('effectId', effectId); //"520fdb6592237be077cf99eb"
  try {
    let { data } = await axios({
      method: 'POST',
      url: process.env.RENDER,
      data: formData,
    });

    download(data.url, user.id)
      .then(async (path) => {
        const newTemplate = await Template.findById(tid);

        let currentImage = {
          url: path,
          id: data.id,
          width: data.width,
          height: data.height,
        };
        let updated = await Template.findByIdAndUpdate(
          { _id: newTemplate._id },
          { $set: { currentImage }, $push: { images: currentImage } }
        );

        // console.log({ currentImage, data });
        res.json(updated);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } catch (err) {
    res.badRequest({
      erorr: 'BACKEND axios ' + err,
    });
  }
});

/**
 *   // IT WILL WORK WHEN not save local
 *   const { buffer, originalname: filename } = file;
 *   console.log(buffer, filename, req.file.originalname);
 *   headers['Content-Type'] = 'multipart/form-data';
 */

/*
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
*/

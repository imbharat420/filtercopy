import request from 'request';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'http';
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

const download = async (url, user_id) => {
  let location = path.join(__dirname, `../../public/uploads/images/${user_id}`);
  let file = uuid() + '.jpg';
  try {
    let response = await axios({
      method: 'get',
      url,
      responseType: 'stream',
    });
    fs.mkdirSync(location, { recursive: true });
    response.data.pipe(fs.createWriteStream(location + '/' + file));
  } catch (err) {
    console.log(err);
  }

  let mainLocation = user_id + '/' + file;
  return mainLocation;
};

export default download;

// const saveImageFromURL = (imageURL, user_id) => {
//   let location = path.join(__dirname, `../../public/uploads/images/${user_id}`);
//   fs.mkdirSync(location, { recursive: true });
//   console.log(location, imageURL);
//   return new Promise((resolve, reject) => {
//     request.get(
//       { url: imageURL, encoding: 'binary' },
//       (err, response, body) => {
//         if (err) reject(err);
//         fs.writeFile(
//           `${location}/${uuid()} '.png'`,
//           body,
//           'binary',
//           (writeErr) => {
//             if (writeErr) reject(writeErr);
//             resolve({ path, imageURL });
//           }
//         );
//       }
//     );
//   });
// };

// export default saveImageFromURL;

// var download = function (uri, user_id, callback) {
//   let location = path.join(
//     __dirname,
//     `../../public/uploads/images/${user_id}/${uuid()}.png`
//   );
//   request(uri).pipe(fs.createWriteStream(location)).on('close', callback);
//   request.head(uri, function (err, res, body) {
//     console.log('content-type:', res.headers['content-type']);
//     console.log('content-length:', res.headers['content-length']);

//   });
// };

// export default download;

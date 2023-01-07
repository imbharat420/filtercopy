import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import Canvas from 'canvas';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(bodyParser.json());


const downloadBase64 = async (base64, filename) => {
  const decodedData = Buffer.from(base64, 'base64');
  await fs.writeFileSync(filename, decodedData);
  return filename;
}


app.get('/image', (req, res) => {
  // Get image URL and text from request body
  const imageUrl = req.query.image;
  const text = req.query.text;

  // Create canvas element
   const canvas = Canvas.createCanvas(800, 600);
  const ctx = canvas.getContext('2d');

  console.log(imageUrl,text);
  // Load image onto canvas
  const image = new Canvas.Image();;
  image.src = imageUrl;
  image.onload = async () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // Add text to canvas
    ctx.font = '36px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to data URI
    const dataUrl = canvas.toDataURL('image/jpeg');
    const base64 = dataUrl.split(',')[1];
    // Return data URI in response
    let fileName = await downloadBase64(base64, 'test.png');

    // res.json({
    //     dataUrl,
    // })
    res.sendFile(fileName, { root: __dirname });
  };
});


app.get('/base64', (req, res) => {
  // Get image URL and text from request body
  const imageUrl = req.query.image;
  const text = req.query.text;

  // Create canvas element
   const canvas = Canvas.createCanvas(800, 600);
  const ctx = canvas.getContext('2d');
  // Load image onto canvas
  const image = new Canvas.Image();;
  image.src = imageUrl;
  image.onload = async () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    // Add text to canvas
    ctx.font = '36px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert canvas to data URI
    const dataUrl = canvas.toDataURL('image/jpeg');
    const base64 = dataUrl.split(',')[1];


    res.json({
        dataUrl,
    })
  };
});


app.listen(3000, () => {
  console.log('API listening on port 3000');
});

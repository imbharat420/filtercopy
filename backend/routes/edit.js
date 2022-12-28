import { Router } from "express";
import multer from "multer";
import path from 'path'
import {renderController, uploadController} from "../controller/editController.js"

const routes = Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     console.log(file);
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });
routes.post("/render",renderController)
routes.post("/upload",upload.single('avatar'),uploadController)


export default routes;
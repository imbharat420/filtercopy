import axios from "axios"
import asyncHandler from "express-async-handler"
import multer from "multer"
import fs from "fs"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// import formidable from 'formidable';
import FormData from "form-data"

const uploadController = asyncHandler(async (req,res)=>{  
    if(!req.file){
        return res.status(400).json({message:"file is required"});
    }

    const filePath = path.join(__dirname, '../uploads/'+ req.file.filename);

    const formData = new FormData()
    formData.append("file",fs.createReadStream(filePath))
    formData.append("name",req.file.originalname)
    

    let {data} = await axios({
        method:"POST" ,
        url: process.env.UPLOAD,
        data:formData,
        headers: { "Content-Type": "multipart/form-data" }, 
    })

    return res.status(200).json({
        id:data.id,
        name:req.file.filename
    });
})


const renderController = asyncHandler(async (req,res)=>{
    if(!req.body.id){
        return res.status(400).json({message:"id is required"});
    } 
    
    const formData = new FormData()
    formData.append("photoId",req.body.id)
    formData.append("effectId", req.body.effectId) //"520fdb6592237be077cf99eb"

    let {data} = await axios({
        method:"POST" ,
        url: process.env.RENDER,
        data:formData
    })
 
    res.status(200).json(data)
})  




export {
    uploadController,
    renderController
}


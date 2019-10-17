const express = require('express');
const router = express.Router();
require('dotenv').config();


const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

//POST UPLOADED FILE TO CLOUDINARY FOLDER & RETURN THE RESULT WITH URL
router.post('/', (req, res) => {
    const file = req.files.file;
    console.log('image upload req.file is:', file);
    
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log('error', err);
        console.log('Result:' , result);
        res.send(result)
    })
    
})
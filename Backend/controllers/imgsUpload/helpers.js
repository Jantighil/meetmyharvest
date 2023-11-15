// const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'meetmyharvest/' })

const cloudinary = require('cloudinary').v2;

            
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


const uploadImage = async (url) => {
  try {
    const result = await cloudinary.uploader.upload(`${url}`, {folder: "meetmyharvest"})
    console.log(result); 
  } catch (error) {
    return error;
  }
}


const deleteImage = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
    
      if (result.result === 'ok') {
        console.log(`Image with public ID ${publicId} deleted successfully.`);
      } else {
        console.error(`Failed to delete image. Cloudinary response:`, result);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
      

module.exports = { uploadImage, deleteImage, upload};


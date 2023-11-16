const multer  = require('multer')
const upload = multer({ dest: 'meetmyharvest/' })

const cloudinary = require('cloudinary').v2;

            
cloudinary.config({ 
  cloud_name: `fortuneify`, 
  api_key: `845998354639772`, 
  api_secret: `w5khFH094yXXSyAtYUVDzh6WmdI` 
});

const uploadImage = async (url) => {
  try {
    const result = await cloudinary.uploader.upload(`${url}`, {folder: "meetmyharvest"})
    // console.log(result); 
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
      

module.exports = { uploadImage, deleteImage, upload, cloudinary};


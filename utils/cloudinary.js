const cloudinary = require("cloudinary").v2
const fs = require("fs")
const { StatusCodes } = require("http-status-codes")

cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.CLOUD_API_KEY,
 api_secret: process.env.CLOUD_API_SECRET
});


const uploadImageCloudinary = async (fileToUpload) => {
 const data = await cloudinary.uploader.upload(
  fileToUpload,
  {
   use_filename: true,
   folder: "test-folder"
  }
 )
 fs.unlinkSync(fileToUpload)
 return data
}

// Cloudinary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {
 try {
  const result = await cloudinary.uploader.destroy(imagePublicId);
  return result;
 } catch (error) {
  console.log(error);
  throw new Error('Internal Server Error (cloudinary)');
 }
};

module.exports = {
 uploadImageCloudinary,
 cloudinaryRemoveImage
}
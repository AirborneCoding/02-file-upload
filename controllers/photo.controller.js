const Photo = require("../models/photo.model")
const { StatusCodes } = require("http-status-codes")
const path = require("path")
const fs = require("fs")
const { uploadImageCloudinary, cloudinaryRemoveImage } = require("../utils/cloudinary")

const CustomError = require("../errors")

/**-----------------------------------------------
 * @desc    Create New object
 * @route   /api/v1/fileUpload
 * @method  POST
 * @access  public 
------------------------------------------------*/
const createObject = async (req, res) => {
 const { title } = req.body;

 // Check the number of existing tasks
 const elementCount = await Photo.countDocuments();
 if (elementCount >= 20) {
  throw new CustomError.BadRequestError("20 Photos as limit for testing has reached. Please delete one and retry.")
 }

 // Check if title exists and is not empty
 if (!title) {
  throw new CustomError.BadRequestError("Please provide title")
 }

 // Check image upload
 if (!req.files || !req.files.image) {
  throw new CustomError.BadRequestError("No image uploaded.")
 }

 const productImage = req.files.image;

 // Check if the uploaded file is an image
 if (!productImage.mimetype.startsWith("image")) {
  throw new CustomError.BadRequestError("Please upload an image.")
 }

 // Check image size not bigger than 1MB
 const maxSize = 1024 * 1024;
 if (productImage.size > maxSize) {
  throw new CustomError.BadRequestError("Please upload an image smaller than 1MB.")
 }

 const imagePath = req.files.image.tempFilePath;

 var result;
 if (elementCount < 20) {
  // Upload image to Cloudinary only if conditions are met
  result = await uploadImageCloudinary(imagePath);
 }

 const id = result.public_id;
 const url = result.secure_url;

 // Create the object
 const object = await Photo.create({
  title,
  image: {
   url: url,
   id: id,
  },
 });

 res.status(StatusCodes.CREATED).json({ object });
};

/**-----------------------------------------------
 * @desc    GET ALL Objects with length
 * @route   /api/v1/fileUpload
 * @method  GET
 * @access  public 
------------------------------------------------*/
const getAllObject = async (req, res) => {
 const objects = await Photo.find().sort({createdAt : -1})
 res.status(StatusCodes.OK).json({ count: objects.length, objects })
}

/**-----------------------------------------------
 * @desc    Create New photo localy
 * @route   /api/v1/fileUpload/UploadPhotoLocaly
 * @method  POST
 * @access  public 
------------------------------------------------*/
const uploadPhotoLocaly = async (req, res) => {
 // 01- check req.fils is existing
 if (!req.files) {
  throw new CustomError.BadRequestError("No File Uploaded")
 }

 // 02- check is image upload or other type of files
 const productImage = req.files.image
 if (!productImage.mimetype.startsWith("image")) {
  throw new CustomError.BadRequestError("Please upload Image")
 }

 // 03- check image size not bigger than 1MB
 const maxSize = 1024 * 1024;
 if (productImage.size > maxSize) {
  throw new CustomError.BadRequestError('Please upload image smaller 1MB');
 }

 // 04- the paths where to stock images (optioanl)
 const imageStock = {
  serverStock: "../images",
  reactStock: "../public/public/images"
 }

 // 05- add date for avoid not upload deplicat image , join the image path to them palace
 const todayDate = new Date().toISOString().replace(/:/g, '-')

 const imagePath = path.join(__dirname, `${imageStock.serverStock}/${todayDate}${productImage.name}`)
 const imagePathForReact = path.join(__dirname, `${imageStock.reactStock}/${todayDate}${productImage.name}`)
 console.log({
  imagePath, imagePathForReact
 });

 // 06- move images from this file to them paths 
 await productImage.mv(imagePath)
 await productImage.mv(imagePathForReact)

 // 07- send responce to client
 return res.status(StatusCodes.OK).json({
  image: {
   srcLocal: `${imagePath}`,
   srcReact: `${imagePathForReact}`
  },
 })
}


/**-----------------------------------------------
 * @desc    Create New photo to cloud
 * @route   /api/v1/fileUpload/UploadPhotoCloudinary
 * @method  POST
 * @access  public 
------------------------------------------------*/
const uploadPhotoCloudinary = async (req, res) => {

 // Check the number of existing tasks
 const elementCount = await Photo.countDocuments();
 if (elementCount >= 20) {
  throw new CustomError.BadRequestError("20 Photo as limit for testing has reached. Please Delete one and retry.")
 }

 // 01- check req.fils is existing
 if (!req.files) {
  throw new CustomError.BadRequestError("No File Uploaded")
 }

 // 02- check is image upload or other type of files
 const productImage = req.files.image
 if (!productImage.mimetype.startsWith("image")) {
  throw new CustomError.BadRequestError("Please upload Image")
 }

 // 03- check image size not bigger than 1MB
 const maxSize = 1024 * 1024;
 if (productImage.size > maxSize) {
  throw new CustomError.BadRequestError('Please upload image smaller 1MB');
 }

 const imagePath = req.files.image.tempFilePath
 const result = await uploadImageCloudinary(imagePath)
 // console.log(result);

 const id = result.public_id
 const url = result.secure_url

 res.status(StatusCodes.OK).json({
  image: { src: url, id: id },
 })
}

/**-----------------------------------------------
 * @desc    delete photo from cloud
 * @route   /api/v1/fileUpload/UploadPhotoCloudinary
 * @method  POST
 * @access  public 
------------------------------------------------*/

const deletePhotofromCloud = async (req, res) => {
 const { id: objectId } = req.params

 const object = await Photo.findOne({ _id: objectId })
 if (!object) {
  throw new CustomError.NotFoundError("element not found")
 }

 const imageId = object.image.id
 await cloudinaryRemoveImage(imageId)

 await object.deleteOne()

 res.status(StatusCodes.OK).json({ msg: "element deleted" })




}


module.exports = {
 createObject,
 uploadPhotoLocaly,
 uploadPhotoCloudinary,
 getAllObject,
 deletePhotofromCloud
}
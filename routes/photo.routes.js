const router = require("express").Router()

const {
 createObject,
 getAllObject,
 uploadPhotoLocaly,
 uploadPhotoCloudinary,
 deletePhotofromCloud
} = require("../controllers/photo.controller")


router.route("/")
 .post(createObject)
 .get(getAllObject)

 router.post("/UploadPhotoCloudinary", uploadPhotoCloudinary)
router.post("/UploadPhotoLocaly", uploadPhotoLocaly)

router.delete("/:id", deletePhotofromCloud)

module.exports = router
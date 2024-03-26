const express = require("express");
const  uploadMultipleImage  = require("../../utils/uploadMultipleImage");
const { videoUploadServices } = require("./videoUpload.service");
const route = express.Router();
// route 
route.post("/demoVideoUpload", uploadMultipleImage.array("myFiles", 30), videoUploadServices.demoVideoUpload)
route.post("/demoVideoUploadWithDynamicLayer", uploadMultipleImage.array("myFiles",30), videoUploadServices.demoVideoUploadWithDynamicLayer)
route.post("/videoUploadWithFixedLayer",uploadMultipleImage.array("myFiles",30),videoUploadServices.videoUploadWithFixedLayer)

module.exports =  route
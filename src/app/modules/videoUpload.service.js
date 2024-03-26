const demoVideoUpload = async(req ,res)=>{
    console.log(req.body);
    var emailString = req.body.Email;
    emailString = emailString.replace(/ +/g, "");
    if (emailString.slice(-1) === ",") {
        emailString = emailString.substring(0, emailString.length - 1);
    }
    var emailArray = emailString.split(",");
    var layerListArray = JSON.parse(req.body.LayerListArray);
    //var layerListArray = req.body.LayerListArray;
    if (layerListArray.length !== 0) {

    }
    console.log(layerListArray);
    var layer1 = req.body.Layer_1;
    var layer2 = req.body.Layer_2;
    var layer3 = req.body.Layer_3;
    var layer4 = req.body.Layer_4;
    var layer5 = req.body.Layer_5;
    var artCollectionId = req.body.CollectionId;
    var ImageUploadArray = [];
    var VideoUploadArray = [];
    var uploadServerURL = "https://hqnfts.ai:5007";
    for (var i = 0; i < req.files.length; i++) {
        var ext = path.extname(req.files[i].originalname);
        ext = ext.toString().toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext == '.jpeg') {
            ImageUploadArray.push({ FileName: req.files[i].filename, OrginalName: req.files[i].originalname })
        } else if (ext === '.mp4' || ext === '.mov' || ext === '.wmv' || ext == '.avi' || ext == '.flv' || ext == '.mkv' || ext == '.webm') {
            VideoUploadArray.push({ FileName: req.files[i].filename, OrginalName: req.files[i].originalname })
        }
    }
    if (emailArray.length === 0) {
        res.send({ Status: "Error", Message: "Email Format Issue" });
    } else {
        if (layerListArray.length === 0) {
            res.send({ Status: "Error", Message: "Layer can't be empty" });
        } if (ImageUploadArray.length === 0 || VideoUploadArray.length === 0) {
            res.send({ Status: "Error", Message: "One Image and one video must be uploaded" });
        } else {
            try {
                for (let i = 0; i < emailArray.length; i++) {
                    let artEngineCollection = database.collection("ArtEngineHistory");
                    let videoCollection = database.collection("VideoUploadInformation");
                    artEngineCollection.find({ _id: ObjectId(artCollectionId) }).toArray(function (findError, findResult) {
                        if (findError) {
                            throw findError;
                        } else {
                            if (findResult.length === 0) {
                                res.send({ Status: "Error", Message: "Invalid Collection Id" });
                            } else {
                                videoCollection.insertOne({
                                    ArtCollectionId: ObjectId(artCollectionId),
                                    Email: emailArray[i],
                                    Image: ImageUploadArray[0].FileName,
                                    ImageName: ImageUploadArray[0].OrginalName,
                                    Video: VideoUploadArray[0].FileName,
                                    VideoName: VideoUploadArray[0].OrginalName,
                                    AllLayerList: layerListArray,
                                    Status: "Active"

                                }, function (error, result) {
                                    if (error) {
                                        throw error
                                    } else {
                                    }
                                });
                            }
                        }
                    });
                }
                res.send({
                    "Status": "success",
                    "TotalEmail": emailArray.length,
                    "Email": emailArray,
                    "Image": uploadServerURL + ImageUploadArray[0].FileName,
                    "Video": uploadServerURL + VideoUploadArray[0].FileName,
                });

            } catch (error) {
                res.send({ Status: "Error", Message: "Invalid Collection Id" });
            }
        }
    }
}
const demoVideoUploadWithDynamicLayer = async(req, res)=>{
    console.log(req.body);
    var emailString = req.body.Email;
    emailString = emailString.replace(/ +/g, "");
    if (emailString.slice(-1) === ",") {
        emailString = emailString.substring(0, emailString.length - 1);
    }
    var emailArray = emailString.split(",");
    var layerListArray = [];
    var finalLayerArray = JSON.parse(req.body.LayerListArray);
    //var layerListArray = req.body.LayerListArray;

    // Iterate through each object in the array
    finalLayerArray.forEach(obj => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                console.log("Key:", key);
                console.log("Value:", value);
                layerListArray.push({ "trait_type": key, "value": value });
            }
        }
    });
    console.log(layerListArray);
    var artCollectionId = req.body.CollectionId;
    var ImageUploadArray = [];
    var VideoUploadArray = [];
    var uploadServerURL = "https://hqnfts.ai:5007";
    for (var i = 0; i < req.files.length; i++) {
        var ext = path.extname(req.files[i].originalname);
        ext = ext.toString().toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext == '.jpeg') {
            ImageUploadArray.push({ FileName: req.files[i].filename, OrginalName: req.files[i].originalname })
        } else if (ext === '.mp4' || ext === '.mov' || ext === '.wmv' || ext == '.avi' || ext == '.flv' || ext == '.mkv' || ext == '.webm') {
            VideoUploadArray.push({ FileName: req.files[i].filename, OrginalName: req.files[i].originalname })
        }
    }
    if (emailArray.length === 0) {
        res.send({ Status: "Error", Message: "Email Format Issue" });
    } else {
        if (layerListArray.length === 0) {
            res.send({ Status: "Error", Message: "Layer can't be empty" });
        } if (ImageUploadArray.length === 0 || VideoUploadArray.length === 0) {
            res.send({ Status: "Error", Message: "One Image and one video must be uploaded" });
        } else {
            try {
                for (let i = 0; i < emailArray.length; i++) {
                    let artEngineCollection = database.collection("ArtEngineHistory");
                    let videoCollection = database.collection("VideoUploadInformation");
                    artEngineCollection.find({ _id: ObjectId(artCollectionId) }).toArray(function (findError, findResult) {
                        if (findError) {
                            throw findError;
                        } else {
                            if (findResult.length === 0) {
                                res.send({ Status: "Error", Message: "Invalid Collection Id" });
                            } else {
                                videoCollection.insertOne({
                                    ArtCollectionId: ObjectId(artCollectionId),
                                    Email: emailArray[i],
                                    Image: ImageUploadArray[0].FileName,
                                    ImageName: ImageUploadArray[0].OrginalName,
                                    Video: VideoUploadArray[0].FileName,
                                    VideoName: VideoUploadArray[0].OrginalName,
                                    AllLayerList: layerListArray,
                                    Status: "Active"

                                }, function (error, result) {
                                    if (error) {
                                        throw error
                                    } else {
                                    }
                                });
                            }
                        }
                    });
                }
                res.send({
                    "Status": "success",
                    "TotalEmail": emailArray.length,
                    "Email": emailArray,
                    "Image": uploadServerURL + ImageUploadArray[0].FileName,
                    "Video": uploadServerURL + VideoUploadArray[0].FileName,
                });

            } catch (error) {
                res.send({ Status: "Error", Message: "Invalid Collection Id" });
            }
        }
    }
}
const videoUploadWithFixedLayer = async(req, res)=>{
    console.log(req.body);
    var emailString = req.body.Email;
    emailString = emailString.replace(/ +/g, "");
    if (emailString.slice(-1) === ",") {
        emailString = emailString.substring(0, emailString.length - 1);
    }
    var emailArray = emailString.split(",");
    var layerListArray = [];
    var layer1 = req.body.Layer_1;
    var layer2 = req.body.Layer_2;
    var layer3 = req.body.Layer_3;
    var layer4 = req.body.Layer_4;
    var layer5 = req.body.Layer_5;
    layerListArray.push({ "trait_type": "Layer_1", "value": layer1 });
    layerListArray.push({ "trait_type": "Layer_2", "value": layer2 });
    layerListArray.push({ "trait_type": "Layer_3", "value": layer3 });
    layerListArray.push({ "trait_type": "Layer_4", "value": layer4 });
    layerListArray.push({ "trait_type": "Layer_5", "value": layer5 });
    console.log(layerListArray);
    var artCollectionId = req.body.CollectionId;
    var ImageUploadArray = [];
    var VideoUploadArray = [];
    var uploadServerURL = "https://hqnfts.ai:5007";
    for (var i = 0; i < req.files.length; i++) {
        var ext = path.extname(req.files[i].originalname);
        ext = ext.toString().toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext == '.jpeg') {
            ImageUploadArray.push({ FileName: req.files[i].filename, OrginalName: req.files[i].originalname })
        } else if (ext === '.mp4' || ext === '.mov' || ext === '.wmv' || ext == '.avi' || ext == '.flv' || ext == '.mkv' || ext == '.webm') {
            VideoUploadArray.push({ FileName: req.files[i].filename, OrginalName: req.files[i].originalname })
        }
    }
    if (emailArray.length === 0) {
        res.send({ Status: "Error", Message: "Email Format Issue" });
    } else {
        if (layerListArray.length === 0) {
            res.send({ Status: "Error", Message: "Layer can't be empty" });
        } else if (ImageUploadArray.length === 0 || VideoUploadArray.length === 0) {
            res.send({ Status: "Error", Message: "One Image and one video must be uploaded" });
        } else {
            try {
                let artEngineCollection = database.collection("ArtEngineHistory");
                let videoCollection = database.collection("VideoUploadInformation");
                artEngineCollection.find({ _id: ObjectId(artCollectionId) }).toArray(function (findError, findResult) {
                    if (findError) {
                        throw findError;
                    } else {
                        if (findResult.length === 0) {
                            res.send({ Status: "Error", Message: "Invalid Collection Id" });
                        } else {
                            for (let i = 0; i < emailArray.length; i++) {
                                videoCollection.insertOne({
                                    ArtCollectionId: ObjectId(artCollectionId),
                                    Email: emailArray[i],
                                    Image: ImageUploadArray[0].FileName,
                                    ImageName: ImageUploadArray[0].OrginalName,
                                    Video: VideoUploadArray[0].FileName,
                                    VideoName: VideoUploadArray[0].OrginalName,
                                    AllLayerList: layerListArray,
                                    Status: "Active"

                                }, function (error, result) {
                                    if (error) {
                                        throw error
                                    } else {
                                    }
                                });
                            }
                            res.send({
                                "Status": "success",
                                //"TotalEmail": emailArray.length,
                                "Email": emailArray,
                                "Image": uploadServerURL + ImageUploadArray[0].FileName,
                                "Video": uploadServerURL + VideoUploadArray[0].FileName,
                            });

                        }
                    }
                });
            } catch (error) {
                res.send({ Status: "Error", Message: "Invalid Collection Id" });
            }
        }
    }
}


// export
module.exports = {
     videoUploadServices : {
         demoVideoUpload,
         demoVideoUploadWithDynamicLayer,
         videoUploadWithFixedLayer
     }
}
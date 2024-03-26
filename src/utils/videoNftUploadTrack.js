const database = require("../server");
const changeStatusToNone = require("./changeStatusToNone");
const sendEmailToVideoNFTOwner = require("./sendEmailToVideoNFTOwner");

function videoNftUploadTrack() {
    let videoCollection = database.collection("VideoUploadInformation");
    let artEngineCollection = database.collection("ArtEngineHistory");
    let mintingCollection = database.collection("MintingInformation");

    videoCollection.find({ Status: "Active" }).toArray(function (err, findResult) {
        if (err) {
            throw err
        } else {
            if (findResult.length !== 0) {
                function insertDesignJsonObject(rowId, rowEmail, rowImage, rowVideo, artCollectionId, allLayerList) {
                    artEngineCollection.find({ _id: ObjectId(artCollectionId) }).toArray(function (error1, collectionResult) {
                        if (error1) {
                            throw error1;
                        } else {
                            if (collectionResult.length !== 0) {
                                mintingCollection.find({ ArtCollectionId: ObjectId(collectionResult[0]._id) }).sort({ _id: -1 }).limit(1).toArray(function (error2, tokenResult) {
                                    if (error2) {
                                        throw error2;
                                    } else {
                                        var videoNftIndexNo;
                                        if (tokenResult.length === 0) {
                                            videoNftIndexNo = 1;
                                        } else {
                                            videoNftIndexNo = parseInt(tokenResult[0].IndexNo) + 1
                                        }
                                        var imageCidData;
                                        var videoCidData;
                                        var jsonCidData;
                                        storeFileInIPFS(rowImage, function (response) {
                                            imageCidData = response;
                                            console.log('Content added with Image CID:', imageCidData);
                                            storeFileInIPFS(rowVideo, async function (response) {
                                                videoCidData = response;
                                                console.log('Content added with Video CID:', videoCidData);
                                                var jsonObject = {
                                                    "name": collectionResult[0].CollectionName + " #" + videoNftIndexNo,
                                                    "description": collectionResult[0].CollectionDescription,
                                                    "attributes": [],
                                                    "creators": [],
                                                    "collection": {
                                                        "name": collectionResult[0].CollectionName,
                                                        "family": ""
                                                    },
                                                    "symbol": collectionResult[0].CollectionSymbol,
                                                    "seller_fee_basis_points": 0,
                                                    "animation_url": "_CID_",
                                                    "image": "_CID_",
                                                    "compiler": "HQNFTs.ai"
                                                };
                                                for (let j = 0; j < allLayerList.length; j++) {
                                                    jsonObject.attributes.push(allLayerList[j]);
                                                }
                                                jsonObject.image = `https://alchemy.mypinata.cloud/ipfs/${imageCidData}${rowImage}`;
                                                jsonObject.animation_url = `https://alchemy.mypinata.cloud/ipfs/${videoCidData}${rowVideo}`;
                                                const blob = new Blob([JSON.stringify(jsonObject)], {
                                                    type: "application/json",
                                                });
                                                const jsonFile = new File([blob], `${videoNftIndexNo.toString()}.json`);
                                                jsonCidData = await client.storeDirectory([jsonFile]);
                                                console.log('Content added with JSON CID:', jsonCidData);
                                                var id = uuidv4();
                                                var uniqueString = id + collectionResult[0]._id + videoNftIndexNo;
                                                mintingCollection.insertOne({
                                                    "ArtCollectionId": ObjectId(collectionResult[0]._id),
                                                    "NFTType": "Video",
                                                    "OwnerId": ObjectId(collectionResult[0].OwnerId),
                                                    "ImageCID": imageCidData,
                                                    "ImageName": rowImage,
                                                    "VideoName": rowVideo,
                                                    "VideoCID": videoCidData,
                                                    "JsonCID": jsonCidData,
                                                    "JsonData": jsonObject,
                                                    "IndexNo": parseInt(videoNftIndexNo),
                                                    "UniqueString": uniqueString,
                                                    "Network": collectionResult[0].Network,
                                                    "MintedStatus": "",
                                                    "SortingDate": Date.now(),
                                                    "HasApproval": "No",
                                                    "ShowStatus": "Active"
                                                }, function (error3, result) {
                                                    if (error3) {
                                                        throw error3
                                                    } else {

                                                        // fs.unlink(filePathForCSV + rowImage, function (err) {
                                                        //     if (err) return console.log(err);
                                                        //     console.log('Image deleted successfully');
                                                        // });
                                                        // fs.unlink(filePathForCSV + rowVideo, function (err) {
                                                        //     if (err) return console.log(err);
                                                        //     console.log('Video deleted successfully');
                                                        // });
                                                        console.log("successfully saved in Database");
                                                        sendEmailToVideoNFTOwner(rowEmail, uniqueString, imageCidData, rowImage, collectionResult, videoNftIndexNo);
                                                        changeStatusToNone(rowId);
                                                    }
                                                })
                                            });
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
                let index = 0;
                async function doNext() {
                    insertDesignJsonObject(findResult[index]._id,
                        findResult[index].Email,
                        findResult[index].Image,
                        findResult[index].Video,
                        findResult[index].ArtCollectionId,
                        findResult[index].AllLayerList
                    );
                    ++index;
                    if (index < findResult.length) {
                        setTimeout(doNext, 12000);
                    }
                }
                doNext();
            }
        }
    });
}

module.exports = videoNftUploadTrack
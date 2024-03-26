function changeStatusToNone(id) {
    let videoCollection = database.collection("VideoUploadInformation");
    videoCollection.updateOne({ _id: ObjectId(id) }, { $set: { Status: "None" } }, { upsert: false });
}
module.exports = changeStatusToNone
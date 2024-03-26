const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const cron = require('node-cron');
const route = require('./app/modules/videoUpload.route');
const videoNftUploadTrack = require('./utils/videoNftUploadTrack');

// middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static(__dirname + "/Public"));
app.use(express.static(__dirname + "/UI"));
app.get('/', (req, res) => {
    res.send("Music NFT Server is Live");
});
cron.schedule('*/10 * * * *', function () {
    console.log('running a task every 10 minutes for updating Music NFT');
    videoNftUploadTrack();
});


module.exports = {
       app
}
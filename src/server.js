const http = require('http'); // Import the http module instead of https
const { app } = require('.');
const PORT = process.env.PORT || 5007;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DatabaseName = 'MultivendorNFT';
var database;

var connectionUrl = "mongodb://0.0.0.0:27017";
// var connectionUrl = "mongodb://0.0.0.0:27017";


http.createServer(app).listen(PORT, () => { // Create HTTP server instead of HTTPS
    console.log('Server is up and running at ' + PORT);
});

MongoClient.connect(connectionUrl, (error, client) => {

    if (error) {
        console.error("Failed to connect to MongoDB:", error);
    } else {
        database = client.db(DatabaseName);
        console.log("Connected to database:", DatabaseName);
    }
});

module.exports = database
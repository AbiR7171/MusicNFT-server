const database = require('../server');
const currentDateTime = require('./currentDateTime');
const sendTotalVideoNftDetailsInMail = require('./sendTotalVideoNftDetailsInMail');

function sendEmailToVideoNFTOwner(email, uniqueString, imageCidData, rowImage, collectionResult, videoNftIndexNo) {

    let loginCollection = database.collection("LoginInfo");
    let audienceManagementCollection = database.collection("AudienceManagement");
    let walletCollection = database.collection("WalletInformation");

    function stringGenPass(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
    var userName = "";
    var rarityRankingCheck = null;
    var artGenerationCheck = null;
    var investInHqnfts = null;
    var password = stringGenPass(6);
    console.log("Auto Pass", password);
    var type = "user";
    var dateTime = currentDateTime();
    loginCollection.find({ Email: email }).toArray(function (err, findResult) {
        if (err) {
            throw err;
        } else {
            if (findResult.length === 0) {
                loginCollection.insertOne({
                    UserName: userName,
                    Email: email,
                    Password: password,
                    RarityRankingCheck: rarityRankingCheck,
                    ArtGenerationCheck: artGenerationCheck,
                    InvestInHqnftsCheck: investInHqnfts,
                    UserType: type,
                    VideoNFTUser: "Yes",
                    DateTime: dateTime
                }, async (error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        audienceManagementCollection.insertOne({
                            UserId: ObjectId(result.insertedId),
                            SetupGas: "No",
                            GasBalance: 0,
                            ApiKey: "",
                            ApiSecret: ""

                        });
                        const ethers = require('ethers');
                        const wallet = await ethers.Wallet.createRandom();
                        console.log('wallet:', wallet);
                        //sendConfirmationMail(email)
                        var mnemonic = wallet.mnemonic.phrase;
                        var privateKey = wallet.privateKey;
                        var address = wallet.address;

                        const keypair = Keypair.generate();
                        const secret_array = keypair.secretKey
                            .toString() //convert secret key to string
                            .split(',') //delimit string by commas and convert to an array of strings
                            .map(value => Number(value));
                        walletCollection.insertOne({
                            UserId: ObjectId(result.insertedId),
                            Address: address,
                            Mnemonic: mnemonic,
                            PrivateKey: privateKey,
                            SolanaAddress: keypair.publicKey.toString(),
                            SolanaSecretKey: secret_array,
                            SolanaBalance: 0.0,
                            CreatedAt: Date.now(),
                            DateTime: Date.now()
                        }, function (error, result4) {
                            if (error) {
                                throw error
                            } else {
                                sendTotalVideoNftDetailsInMail(email, uniqueString, result.insertedId, password, imageCidData, rowImage, collectionResult[0], videoNftIndexNo)
                            }
                        })
                    }
                });
            } else {
                sendTotalVideoNftDetailsInMailOld(email, uniqueString, findResult[0]._id, imageCidData, rowImage, collectionResult[0], videoNftIndexNo);
            }
        }
    });
}

module.exports = sendEmailToVideoNFTOwner
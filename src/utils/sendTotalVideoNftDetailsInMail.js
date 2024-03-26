const smtpTransport = require("./nodeMailer");

function sendTotalVideoNftDetailsInMail(email, uniqueString, userId, password, imageCidData, rowImage, collectionResult, videoNftIndexNo) {
    console.log("New", userId);
    try {
        var errorResult = "error";
        mailOptions = {
            from: "no-reply@hqnfts.xyz",
            to: email,
            subject: `Congratulations! Token ${videoNftIndexNo}`,
            html:
                `<html>
                <head>
                    <style>
                        @media screen and (max-width:992px) {
                            .NftImage {
                                max-height: 250px;
                                max-width: 250px;
                                object-fit:contain;
                            }
                        }
                    </style>
                </head>
                
                <body>
                    <h1 style="color:#000;">Congratulations! Your NFT ${videoNftIndexNo} is ready</h1>
                    <div style="width: 96%;
                                                    height: 100%;
                                                    overflow-y: auto;
                                                    background-color:#f3f3f3;">
                        <div style="width: 100%;
                                                            height: 100%;
                                                            overflow-y: auto;
                                                            font-size: 1.1rem;
                                                            background-color:#0f051d;">
                            <div style="display: flex;
                                        text-align: center;
                                        padding-left: 10px;
                                        padding-right: 10px;">
                                <a style=" text-decoration: none;
                                                                                                                                               padding: 15px 30px;
                                                                                                                                                background-color: #4c50cc;
                                                                                                                                                       color:#fff;
                                                                                                                                                       width: 100%;
                                                                                                                                                       margin-top: 10px;"
                                    href="" target="_blank">${collectionResult.CollectionName}</a>
                            </div>
                            <div class="row" style="margin-left: 20px;padding-top:20px">
                                <img src="https://hqnfts.ai/dist/img/logo-white.png" alt="Logo"
                                    style="max-width: 200px; max-height: 40px" />
                            </div>
                            <hr>
                            <div style="color:#fff;padding-left: 20px;">
                                <p> Congratulations! Your out of this world experience is now ready. <br> Please click on this link to
                                    collect.</p>
                                <div class="">
                                    <div style="display: block;
                                                                text-align: center; margin-top: 30px;">
                                        <a style=" text-decoration: none;
                                                                                                                                               padding: 15px 30px;
                                                                                                                                                background-color: #4c50cc;
                                                                                                                                                  border-radius: 10px;
                                                                                                                                                    margin-top: 20px;
                                                                                                                                                       color:#fff;"
                                            href="https://hqnfts.xyz/video-nft/${uniqueString}/${userId}" target="_blank">Claim Your NFT</a>
                                    </div>
                
                                    <div style="display: block;
                                                                        text-align: center;">
                
                                        <img class="NftImage"
                                            src="https://alchemy.mypinata.cloud/ipfs/${imageCidData}/${rowImage}"
                                            alt="thumbnail" style="
                                                                                                                background-color: #313741;
                                                                                                                 padding: 10px;
                                                                                                                height: 100%;
                                                                                                                width: auto;
                                                                                                                 border-radius: 10px;
                                                                                                                 max-height: 300px;                                                                                                 
                                                                                                                 margin-top: 30px;
                                                                                                               " />
                                    </div>
                
                                </div>
                                <div style="text-align:center">
                                    <p>${collectionResult.CollectionDescription}</p>
                                </div>
                                <div style="text-align: center;
                                                padding-bottom:20px;">
                                    <a href="${collectionResult.DiscordLink}" style="color: #fff; text-decoration: none">
                                        <img style="width: 25px; height:25px" src="https://hqnfts.ai/dist/img/discord.png"
                                            alt="Discord Logo" />
                                    </a>
                                    <a href="${collectionResult.TwitterLink}" style="color: #fff; text-decoration: none">
                                        <img style="width: 25px; height:25px" src="https://hqnfts.ai/dist/img/twitter.png"
                                            alt="Twitter Logo" />
                                    </a>
                                    <a href="${collectionResult.InstragramLink}" style="color: #fff; text-decoration: none">
                                        <img style="width: 25px; height:25px" src="https://hqnfts.ai/dist/img/instagram.png"
                                            alt="Instagram Logo" />
                                    </a>
                                </div>
                
                            </div>
                        </div>
                    </div>
                </body>
                
                </html>`
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {

            if (error) {
                console.log(error);
                errorResult = "error";
                // console.log(error);
            } else {
                errorResult = "success";
                console.log("Message sent: ");
                console.log(response);
            }
            //console.log("Result error: "+errorResult);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendTotalVideoNftDetailsInMail
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "no-reply@hqnfts.xyz",
        pass: "clewzqmnuyrwtwaz"
    }
});

module.exports = smtpTransport
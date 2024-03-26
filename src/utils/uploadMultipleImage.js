var multer = require('multer');
var path = require('path');

var uploadMultipleImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            callback(null, filePathForCSV);
        },
        filename: function (req, file, callback) {
            callback(null, "/" + file.fieldname + '-File' + Date.now() + path.extname(file.originalname));
        }
    }),
});


module.exports = uploadMultipleImage

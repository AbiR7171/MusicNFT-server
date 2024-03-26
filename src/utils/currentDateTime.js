const formatTime = require("./formatTime");

function currentDateTime() {

    var d = new Date();
    var datetime = ("0" + (d.getMonth() + 1)).slice(-2) +
        "/" +
        ("0" + (d.getDate())).slice(-2) +
        "/" +
        d.getFullYear() +
        " " +
        formatTime(d);
    return datetime;
}

module.exports = currentDateTime
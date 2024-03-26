function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var am = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + am;
    return strTime;
}

module.exports = formatTime;
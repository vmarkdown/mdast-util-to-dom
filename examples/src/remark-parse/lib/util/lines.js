module.exports = function getLines (text) {
    var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;
    return text.split(BREAK_LINE_REGEXP);
};
module.exports = {
    hash: function hash(str) {
        str = String(str);
        var hash = 5381, i = str.length;
        while(i) {
            hash = (hash * 33) ^ str.charCodeAt(--i);
        }
        return hash >>> 0;
    },
    isArray: (function () {
        if(Array.isArray){return Array.isArray;}
        return function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
    })()
};

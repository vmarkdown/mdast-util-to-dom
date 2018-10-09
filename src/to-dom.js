var Parser = require('./parser');

module.exports = function toDom(node, options) {
    var parser = new Parser(options);
    return parser.parse(node);
};

// module.exports = function plugin(options) {
//     var parser = new Parser(options);
//     return function toDom(root) {
//         return parser.parse(root);
//     }
// };
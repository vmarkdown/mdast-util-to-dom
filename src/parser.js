var renderer = require('./renderer');
var h = require('./create-element');
var util = require('./util');

function Parser(options) {
    this.options = options;
}

Parser.prototype.parseNodes = function(nodes, parent) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        node.parent = parent;
        node.index = i;
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }

    // var hash = nodes.map(function (item) {
    //     return item.hash;
    // }).reduce(function (a, b) {
    //     var hash = [];
    //     if(a) hash.push(a);
    //     if(b) hash.push(b);
    //     return hash.join('-');
    // });
    //
    // parent.hash = util.hash(hash);
    // try {
    // }
    // catch (e) {
    //     debugger
    // }

    return vnodes;
};

Parser.prototype.parseNode = function(node) {
    if(!node) return null;

    // if(node.value) {
    //     node.hash = util.hash(node.value);
    // } else if(node.url) {
    //     node.hash = util.hash(node.url);
    // }

    var children = this.parseNodes(node.children, node);
    return renderer[node.type].apply(null, [h, node, children, this.options]);
};

Parser.prototype.parse = function(root) {
    try {
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        // return this.h?this.h('div', {}, 'error'):null;
        return document.createTextNode(e.message || 'error');
    }
};

module.exports = Parser;
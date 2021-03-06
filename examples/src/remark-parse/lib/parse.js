'use strict';

var xtend = require('xtend');
var removePosition = require('unist-util-remove-position');

module.exports = parse;

var C_NEWLINE = '\n';
var EXPRESSION_LINE_BREAKS = /\r\n|\r/g;

/* Parse the bound file. */
function parse() {
    // console.log('parse')

    var self = this;
    var value = String(self.file);
    var start = {line: 1, column: 1, offset: 0};
    var content = xtend(start);
    var node;

    /* Clean non-unix newlines: `\r\n` and `\r` are all
     * changed to `\n`.  This should not affect positional
     * information. */
    value = value.replace(EXPRESSION_LINE_BREAKS, C_NEWLINE);

    if (value.charCodeAt(0) === 0xFEFF) {
        value = value.slice(1);

        content.column++;
        content.offset++;
    }

    node = {
        type: 'root',
        children: self.tokenizeBlock(value, content),
        position: {
            start: start,
            end: self.eof || xtend(start)
        }
    };

    if (!self.options.position) {
        removePosition(node, true);
    }

    return node;
}

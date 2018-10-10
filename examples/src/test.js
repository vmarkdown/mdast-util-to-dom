const util = require('../../src/util');
const unified = require('unified');
const parse = require('./remark-parse/index');

const processor = unified()
    .use(parse, {});

const md = require('./demo.md');

console.time('parse');
const mdast = processor.parse(md);
console.timeEnd('parse');

console.log(mdast);

document.getElementById('app').innerText = md;
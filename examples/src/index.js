const toDom = require('../../index');
const unified = require('unified');
const parse = require('remark-parse');

const processor = unified()
    .use(parse, {});

const md = require('./demo.md');

const mdast = processor.parse(md);

console.log(mdast);


mdast.properties = {
    "className": ["markdown-body"]
};

const dom = toDom(mdast);
console.log(dom);

document.getElementById('app').appendChild(dom);


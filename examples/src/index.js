const toDom = require('../../index');
const unified = require('unified');
const parse = require('remark-parse');

const processor = unified()
    .use(parse, {});

const md = require('./demo.md');

console.time('parse');
const mdast = processor.parse(md);
console.timeEnd('parse');

console.log(mdast);

mdast.properties = {
    "className": ["markdown-body"]
};

console.time('toDom');
const dom = toDom(mdast);
console.timeEnd('toDom');

console.log(dom);

document.getElementById('app').appendChild(dom);








const findNode = require("unist-find-node");

function findDom(line) {
    let child = findNode(mdast, { line: line, column: 1 });
    console.log(child);

    child && $('[data-id='+child.hash+']').addClass('active');

}

findDom(3);



// setTimeout(function () {
//     let el = document.querySelector('[data-start-line="17"]');
//
//     let newDom = document.createElement('div');
//     newDom.innerText = '=======';
//     // el.replaceChild(newDom, el.childNodes[0]);
//
//     dom.replaceChild(newDom, el);
// }, 3000);
// (function () {
//
// })();

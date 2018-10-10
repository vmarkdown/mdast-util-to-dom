const util = require('../../src/util');

const toDom = require('../../index');
const unified = require('unified');
const parse = require('./remark-parse/index');

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

// console.log(dom);

document.getElementById('app').appendChild(dom);

const findNode = require("unist-find-node");

function findDom(line) {
    let child = findNode(mdast, { line: line, column: 1 });

    // console.log(child);

    if(!child || child.type ==='root') return null;

    let findEl = $('[data-hash='+child.hash+']');

    if(findEl.length === 0) {
        let startLine = child.start.line;
        findEl = $('[data-id='+child.hash+']'+'[data-line='+startLine+']');
    }

    return findEl;
}

function findDomByLine(line) {
    let node = findNode(mdast, { line: line, column: 1 });
    if(!node || node.type ==='root') return null;
    let startLine = node.position.start.line;
    let findEl = $('[data-line='+startLine+']');
    return findEl;
}

function findDomByHash(hash) {
    let findEl = $('[data-hash='+hash+']');
    return findEl;
}

function activeDom(line) {
    $('.active').removeClass('active');
    let findEl = findDom(line);
    findEl && findEl.addClass('active');
}

function modifyDom(line) {
    let findEl = findDom(line);

    console.log(findEl);

    if(!findEl){
        return
    }

    // findEl.after('<li>==='+line+'===</li>');
    // findEl.remove();

    findEl.text('==='+line+'===');

}

function removeDom(line) {
    let findEl = findDom(line);
    if(!findEl){
        return
    }

    findEl.remove();
}

function getLines (text) {
    var BREAK_LINE_REGEXP = /\r\n|\r|\n/g;
    return text.split(BREAK_LINE_REGEXP);
}

(function () {
    const line = 123;



    let child = findNode(mdast, { line: line, column: 1 });

    let node = child;
    if(child.parent &&
        (child.parent.type === 'list' || child.parent.type === 'table')
    ) {
        node = child.parent;
    }
    let position = node.position;
    let from = position.start.line;
    let to = position.end.line;

    // debugger

    const lines = getLines(md);

    const block = lines.slice(from-1, to);

    // if(node.type === 'code') {
    //     debugger
    // }

    var hash = util.hash(block);

    console.log(hash);

    var d = findDomByHash(hash);
    console.log(d);

    d.addClass('active');


})();


// console.log(findDom(9));



// removeDom(7);

// for(let i=0;i<140;i++) {
//     setTimeout(function () {
//         let line = i+1;
//         console.log(line);
//         modifyDom(line);
//     }, 1000 * i);
// }


// findDom(50);



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

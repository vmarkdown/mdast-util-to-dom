var isArray = (function () {
    if(Array.isArray){return Array.isArray;}
    return function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
})();

function appendChildren(parent, children) {

    if(!children){
        return parent;
    }

    if(!isArray(children)){
        parent.appendChild(document.createTextNode(children));
        return parent;
    }

    var container = document.createDocumentFragment();

    for (var i=0;i<children.length;i++) {
        container.appendChild(children[i]);
    }

    parent.appendChild(container);

    return parent;
}

function props(dom, node) {

    var properties = node.properties;
    if(properties) {
        Object.keys(properties).forEach(function (key) {
            var value = properties[key];

            if(key === 'className'){
                dom.setAttribute('class', value);
            }
            else{
                dom.setAttribute(key, value);
            }

        });
    }

    // if(node.align) {
    //     dom.setAttribute('align', node.align);
    // }

    if(node.type === "image") {
        if(node.url) {
            dom.setAttribute('src', node.url);
        }
    }
    else if(node.type === "link") {
        if(node.url) {
            dom.setAttribute('target', '_blank');
            dom.setAttribute('href', node.url);
        }
    }

    if(node.title) {
        dom.setAttribute('title', node.title);
    }

}

module.exports = function createElement(tagName, node, children) {
    var dom = document.createElement(node.tagName || tagName);
    props(dom, node);
    appendChildren(dom, children);
    return dom;
};

/**
 * Renderer
 *
 * extend mdast
 {
     "type": "heading",
     "depth": 1 <= number <= 6,
     "tagName": "a",
     "parent": parent,
     "properties": {
         "href": "http://alpha.com",
         "id": "bravo",
         "className": ["bravo"],
         "download": true
     },
     "children": []
 }
 */



module.exports = {


    root: function(h, node, children) {
        return h('div', node, children);
    },

    blockquote: function(h, node, children) {
        return h('blockquote', node, children);
    },

    heading: function(h, node, children) {
        return h('h'+node.depth, node, children);
    },

    thematicBreak : function(h, node) {
        return h('hr', node);
    },

    list : function(h, node, children) {
        return h(node.ordered?'ol':'ul', node, children);
    },

    listItem : function(h, node, children) {

        if(node.hasOwnProperty('checked') && node.checked !== null) {
            if(children && children.length>0 && children[0].children) {

                // children[0].children.unshift(
                    // h('input', {
                    //     'class': ['list-item-checkbox'],
                    //     attrs: {
                    //         type: 'checkbox',
                    //         checked: node.checked,
                    //         readonly: true,
                    //         disabled: true,
                    //     }
                    // })
                // );


                var d = document.createElement('input');
                d.setAttribute('type', 'checkbox');
                node.checked && d.setAttribute('checked', 'checked');
                d.setAttribute('disabled', 'disabled');

                // d.innerText = 'checkbox';
                children[0].insertBefore(d, children[0].firstChild);
            }
        }
        return h('li', node, children);
    },

    paragraph : function(h, node, children) {
        return h('p', node, children);
    },

    table : function(h, node, children) {
        return h('table', node, [
            h('tbody', {}, children)
        ]);
        // return h('table', node, children);
    },

    tableRow : function(h, node, children) {
        return h('tr', node, children);
    },

    tableCell : function(h, node, children) {
        // var tagName = (node.parent.index === 0)?'th':'td';
        return h('td', node, children);
    },

    strong : function(h, node, children) {
        return h('strong', node, children);
    },

    emphasis : function(h, node, children) {
        return h('em', node, children);
    },

    break : function(h, node) {
        return h('br', node);
    },

    delete : function(h, node, children) {
        return h('del', node, children);
    },

    link : function(h, node, children) {
        // return h('a', props(node, {
        //     attrs: {
        //         // target: '_blank',
        //         href: node.url,
        //         title: node.title
        //     }
        // }), children);

        // target="_blank"

        return h('a', node, children);
    },

    linkReference : function(h, node, children) {
        // return h('a', props(node, {
        //     attrs: {
        //         href: node.url,
        //         title: node.title
        //     }
        // }), children);
        return h('a', node, children);
    },

    definition : function(h, node, children) {
        // return null;
        // return h('div', props(node, {
        //         style: {
        //             height: 0,
        //             visibility: 'hidden'
        //         }
        //     }),
        //     h('a', {
        //         key: 0,
        //         href: node.url,
        //         'data-identifier': node.identifier
        //     }, [
        //         '['+node.identifier+']: ',
        //         node.url
        //     ])
        // );
    },

    image : function(h, node) {
        // return h('img', props(node, {
        //     attrs: {
        //         src: node.url,
        //         alt: node.alt,
        //         title: node.title
        //     }
        // }));

        return h('img', node);

    },

    imageReference: function(h, node, children) {

    },

    text : function(h, node) {
        // return h('span', node, node.value);
        // debugger
        return document.createTextNode(node.value);
    },

    inlineCode : function(h, node, children) {
        return h('code', node, node.value);
    },

    code : function(h, node, children) {
        var className = [];
        node.lang && className.push('language-'+node.lang);
        return h('pre', node, [
            h('code', {
                "properties": {
                    "className": className
                }
            }, node.value)
        ]);
    },

    yaml : function(h, node, children) {
        // return h('pre', props(node), h('code', {
        //     'class': 'language-yaml'
        // }, node.value));
    },

    math : function(h, node, children) {
        // return h('p', props(node, {
        //     domProps: {
        //         innerHTML: node.value
        //     }
        // }));
    },

    inlineMath : function(h, node, children) {
        // return h('span', props(node, {
        //     domProps: {
        //         innerHTML: node.value
        //     }
        // }));
    },

    html : function(h, node, children) {
        // return h('div', props(node, {
        //     domProps: {
        //         innerHTML: node.value
        //     }
        // }));
    },

    footnote : function(h, node, children) {
        return h('span', node, children);
    },

    footnoteReference : function(h, node, children) {
        // return h('a', props(node, {
        //     attrs: {
        //         id: node.ref,
        //         className: 'footnote-reference',
        //         href: '#'+node.def
        //     }
        // }), node.value);
    },

    footnoteDefinition : function(h, node, children) {
        // return h('div', props(node, {
        //     attrs: {
        //         id: node.def,
        //         className: 'footnote-definition'
        //     }
        // }), children);
    },


    /*
    root : function(node, children, options) {
        return h('div', node.properties, children);
    },

    text : function(node, children, options) {
        var dom = document.createTextNode(node.value);
        return dom;
    },

    inlineCode : function(node, children, options) {},

    blockquote : function(node, children, options) {},

    heading : function(node, children, options) {
        return h('h'+node.depth, node.properties, children);
    },

    thematicBreak : function(node, children, options) {},

    list : function(node, children, options) {},

    listItem : function(node, children, options) {},

    checkbox : function(node, children, options) {},

    paragraph : function(node, children, options) {},

    table : function(node, children, options) {},

    tableRow : function(node, children, options) {},

    tableCell : function(node, children, options) {},

    strong : function(node, children, options) {},

    emphasis : function(node, children, options) {},

    break : function(node, children, options) {},

    delete : function(node, children, options) {},

    link : function(node, children, options) {},

    linkReference : function(node, children, options) {},

    definition : function(node, children, options) {},

    image : function(node, children, options) {},

    imageReference : function(node, children, options) {},

    math : function(node, children, options) {},

    inlineMath : function(node, children, options) {},

    html : function(node, children, options) {},

    code : function(node, children, options) {},
    */


};
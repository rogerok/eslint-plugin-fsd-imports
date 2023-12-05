"use strict";
const path = require("path");
const os = require("os");

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "checks imports",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {

    return {
      ImportDeclaration (node) {
        // app/entities/Article
        const importTo = node.source.value;
        // full path from PC, like ~/my-projects/ulbi-course/src/index.tsx
        const fromFileName = context.getFilename();

        if(shouldBeRelative(fromFileName, importTo)) {
          context.report(node, 'Path should be relative');
        }
      }
    };
  },
};
function normalizePath(execPath) {
  const splitter = os.type() === 'Windows_NT' ? '\\' : '/'
  const normalizedPath = path.normalize(execPath);

  return normalizedPath.split(splitter).join('/')
}




function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

const layers = {
  'entities': 'entities',
  'features': 'features',
  'widgets': 'widgets',
  'pages': 'pages',
  'shared': 'shared',
}

function shouldBeRelative(currentFilePath, importTo) {
  let shouldBeRelative = false;

  if(!isPathRelative(importTo)) {
    const toArray = importTo.split('/')
    const toLayer = toArray[0];
    const toSlice = toArray[1];

    if(toLayer && toSlice && layers[toLayer]) {
      const normalizedPath = normalizePath(currentFilePath);
      const fromArray = normalizedPath.split('src')[1].split('\\');
      const fromLayer = fromArray[1];
      const fromSlice = fromArray[2];

      if(fromLayer && fromSlice && layers[fromLayer]) {
        shouldBeRelative = fromLayer === toLayer && fromSlice === toSlice;
      }
    }
  }

 return shouldBeRelative;
}



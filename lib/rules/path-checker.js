
"use strict";

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

    const isRelativeImport = (node) => node.path.includes('./')


    return {
      ImportDeclaration: function (node) {
        // app/entities/Article
        const pathImport = node.source.value;

        // full path from PC, like ~/my-projects/ulbi-course/src/index.tsx
        const fromFileName = context.getFilename()

        context.report(node, 'linter error')
      }
    };
  },
};

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        if (source === '@digi/components') {
          const newImports = path.node.specifiers
            .map((specifier) => {
              if (t.isImportSpecifier(specifier)) {
                const importedName = specifier.imported.name;
                return t.importDeclaration(
                  [t.importDefaultSpecifier(specifier.local)],
                  t.stringLiteral(`@digi/components/dist/es/${importedName.toLowerCase()}`)
                );
              }
              return null;
            })
            .filter(Boolean);

          if (newImports.length > 0) {
            path.replaceWithMultiple(newImports);
          } else {
            path.remove();
          }
        }
      },
    },
  };
};

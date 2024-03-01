class PrependTextPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('PrependTextPlugin', (compilation, callback) => {
      Object.keys(compilation.assets).forEach((filename) => {
        const originalAsset = compilation.assets[filename];
        let content = originalAsset.source();

        if (typeof content !== 'string') {
          content = content.toString();
        }

        const updatedContent = `'use client';\n\n${content}`;
        const updatedAsset = {
          source: () => updatedContent,
          size: () => updatedContent.length,
        };

        compilation.assets[filename] = updatedAsset;
      });
      callback();
    });
  }
}

module.exports = PrependTextPlugin;

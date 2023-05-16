import path from 'path';

const fileTransformer = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  process(sourceText, sourcePath, options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};

export default fileTransformer;

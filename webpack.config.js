const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');

function recursiveRead(dir) {
  let results = [];
  let items = fs.readdirSync(dir);
  for (let i = 0; i < items.length; i++) {
    const fullPath = path.resolve(dir, items[i]);
    const stat = fs.statSync(fullPath);
    if (stat) {
      if (!stat.isDirectory()) {
        if (path.basename(fullPath).includes('entry')) {
          results.push(fullPath);
        }
      }
      else {
        results = results.concat(recursiveRead(fullPath));
      }
    }
  }
  return results;
}

module.exports = {
  // mode: 'development',
  entry: function() {
    let entries = { 'loader': [path.resolve(srcPath, 'loader.jsx')] };
    let files = recursiveRead(srcPath, []);
    files.forEach(file => {
      const dirPath = path.relative(srcPath, path.dirname(file));
      const name = path.basename(file).split('.').shift();
      const entryName = `${dirPath}/${name}`;
      if (!entries.hasOwnProperty(entryName)) {
        entries[entryName] = [];
      }
      entries[entryName].push(file);
    })
    console.log(entries);
    return entries;
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    // alias: {
    //   'components': path.resolve(srcPath, 'lib', 'components')
    // }
  },
  devtool: 'source-map',
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};
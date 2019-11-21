module.exports = {
  target: 'webworker',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /index\.js$/,
        use: [{
          loader: 'webpack-rollup-loader'
        }]
      }
    ]
  }
}

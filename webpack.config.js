var path = require('path')

module.exports = [
  'source-map',
].map(devtool => ({
  mode: 'development',
  devtool
}))

module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }],
    noParse: [
      /aws\-sdk/,
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env'
    })
  ],
  devtool: 'source-map'
}

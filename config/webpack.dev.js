const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: "./src/index.js",
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, //压缩空白
        removeAttributeQuotes: true //删除属性双引号
      },
      hash: true,
      title: 'chinaMasters',
      template: './index.html'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true, //console
          pure_funcs: ['console.log'] //移除console
        }
      }
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    host: 'localhost',
    compress: true,
    port: 8020
  }
}
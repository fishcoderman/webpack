const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const PurifyCssWebpack = require('purifycss-webpack')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    index: "./src/index.js",
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    publicPath: './'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'
        }),
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'images'
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '../'
        })
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
    new ExtractTextPlugin("css/index.css"),
    // new PurifyCssWebpack({
    //   paths:glob.sync(path.join(__dirname, '*.html'))
    // }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/static'),
      to: './static'
    }]),
   
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    host: 'localhost',
    compress: true,
    port: 8020
  },
  // optimization: {
  //   // 采用splitChunks提取出entry chunk的chunk Group
  //   splitChunks: {
  //     cacheGroups: {
  //       // 处理入口chunk
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'initial',
  //         name: 'vendors',
  //       },
  //       // 处理异步chunk
  //       'async-vendors': {
  //         test: /[\\/]node_modules[\\/]/,
  //         minChunks: 2,
  //         chunks: 'async',
  //         name: 'async-vendors'
  //       }
  //     }
  //   },
  //   // 为每个入口提取出webpack runtime模块
  //   runtimeChunk: { name: 'manifest' }
  // }
}
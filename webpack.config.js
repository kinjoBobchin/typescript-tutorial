const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const MODE = 'development';
const enabledSourceMap = (MODE === 'development');


module.exports = {
  entry: "./src/index.ts", // メインになるJavaScriptのファイル

  output: {
    filename: "bundle.js" // 出力するファイル名
  },

  mode: MODE,

  devServer: {
    contentBase: "./dist",
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        // 拡張子.jsの場合
        test: /\.js$/,
        use: [
          {
            // babelを使用する
            loader: "babel-loader",
            options: {
              presets: [
                // envを使用することでES2017 を ES5に変換
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ["env", { "modules": false }]
              ]
            }
          }
        ],
        exclude: /node_modules/, // node_moduleはbabelを通さない
      }, {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader" // TypeScript をコンパイルする
          }
        ],
        resolve: {
          extensions: [ // import 文で .ts ファイルを解決するため
            ".ts"
          ]
        }
      }, {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      }, {
        test: /\.sass$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options:
              {
                url: false, // オプションでCSS内のurl()メソッドの取り込みを禁止する
                minimize: true, // CSSの空白文字を削除する
                sourceMap: enabledSourceMap,
                importLoaders: 2 // 2 => postcss-loader, sass-loader
              }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap, // ソースマップの利用有無
            }
          }
        ]
      }
    ]
  },
  plugins: [
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    title: 'main template',
    hash: true,
    template: './src/index.pug'
    }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
  ]
}
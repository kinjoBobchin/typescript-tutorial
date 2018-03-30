const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

module.exports = {
  // メインになるJavaScriptのファイル
  entry: "./src/index.ts",

  output:
  {
    // 出力するファイル名
    filename: "main.js"
  },

  mode: MODE,

  devServer:
  {
    contentBase: "./dist",
    open: true,
    hot: true,
    compress: true,
    stats: "errors-only" //コメントが冗長なので、エラーだけをlogに出力
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
        // node_moduleはbabelをかまさない
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          {
            // TypeScript をコンパイルする
            loader: "ts-loader"
          }
        ],
        resolve: {
          // import 文で .ts ファイルを解決するため
          extensions: [
            ".ts"
          ]
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      },
      {
        test: /\.sass$/,
        use: [ 'style-loader', 'sass-loader', 'css-loader' ],
        options: {
          // オプションでCSS内のurl()メソッドの取り込みを禁止する
          url: false,
          // CSSの空白文字を削除する
          minimize: true,
          // ソースマップを有効にする
          sourceMap: true
        }
      }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    title: 'main template',
    hash: true,
    template: './src/index.pug'
    }),
  new ExtractTextPlugin({
    filename: "styles.css",
    disable: false,
    allChunks: true
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin()
  ],
}
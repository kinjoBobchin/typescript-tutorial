module.exports = {
  // メインになるJavaScriptのファイル
  entry: "./src/index.js",


  output: {

    // 出力するファイル名
    filename: "main.js"

  },
  mode: "development",


  devServer: {
    contentBase: "./dist",
    open: true
  }
}